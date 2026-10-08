import React, { useEffect, useState } from 'react';
import { getDashboardCharts } from '../../services/dashboardApi';
import type { DashboardSummary, DashboardCharts } from '../../types';
import Spinner from '../../components/ui/Spinner';

// ─── Validated palette ───────────────────────────────────────────────────────
// Status donut: app semantic colors, all ≥3:1 contrast; CVD floor 6.8 → labels are secondary encoding
const STATUS_COLORS = {
  pending: '#B45309',
  in_progress: '#1D4ED8',
  completed: '#15803D',
} as const;
// Priority ordinal: single blue hue, light→dark (validator: ordinal PASS)
const PRIORITY_COLORS = { low: '#86b6ef', medium: '#2a78d6', high: '#0d366b' } as const;
// Employee single series: slot-1 blue
const SERIES_1 = '#2a78d6';
// Chart chrome
const GRIDLINE = '#e1e0d9';
const TEXT_SECONDARY = '#52514e';
const TEXT_MUTED = '#898781';
const SURFACE = '#ffffff';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function niceMax(val: number): number {
  if (val <= 0) return 5;
  const exp = Math.floor(Math.log10(val));
  const mag = Math.pow(10, exp);
  const frac = val / mag;
  const nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  return nice * mag;
}

function donutArc(
  cx: number, cy: number, R: number, r: number,
  startAngle: number, endAngle: number,
  gap = 0.025
): string {
  const s = startAngle + gap;
  const e = endAngle - gap;
  if (e <= s) return '';
  const cos = Math.cos, sin = Math.sin;
  const x1 = cx + R * cos(s), y1 = cy + R * sin(s);
  const x2 = cx + R * cos(e), y2 = cy + R * sin(e);
  const x3 = cx + r * cos(e), y3 = cy + r * sin(e);
  const x4 = cx + r * cos(s), y4 = cy + r * sin(s);
  const large = (e - s) > Math.PI ? 1 : 0;
  return `M${x1} ${y1} A${R} ${R} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`;
}

// ─── Chart card wrapper ───────────────────────────────────────────────────────
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: SURFACE,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: TEXT_SECONDARY,
          marginBottom: '16px',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

// ─── 1. Status Donut ─────────────────────────────────────────────────────────
interface StatusDonutProps {
  pending: number;
  inProgress: number;
  completed: number;
}

function StatusDonut({ pending, inProgress, completed }: StatusDonutProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const total = pending + inProgress + completed;

  const segments = [
    { key: 'pending', label: 'Pending', value: pending, color: STATUS_COLORS.pending },
    { key: 'in_progress', label: 'In progress', value: inProgress, color: STATUS_COLORS.in_progress },
    { key: 'completed', label: 'Complete', value: completed, color: STATUS_COLORS.completed },
  ];

  const CX = 82, CY = 82, R = 68, INNER = 44;
  const svgSize = 164;

  let angle = -Math.PI / 2;
  const arcs = segments.map((seg) => {
    const sweep = total > 0 ? (seg.value / total) * 2 * Math.PI : 0;
    const path = sweep > 0.01 ? donutArc(CX, CY, R, INNER, angle, angle + sweep) : '';
    const midAngle = angle + sweep / 2;
    angle += sweep;
    return { ...seg, path, midAngle };
  });

  if (total === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px 0', color: TEXT_MUTED, fontSize: '13px' }}>
        No tasks yet
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ flexShrink: 0 }}
        aria-label="Task status distribution"
      >
        {arcs.map((arc) =>
          arc.path ? (
            <path
              key={arc.key}
              d={arc.path}
              fill={arc.color}
              opacity={hovered && hovered !== arc.key ? 0.45 : 1}
              style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={() => setHovered(arc.key)}
              onMouseLeave={() => setHovered(null)}
            />
          ) : null
        )}
        {/* Center total */}
        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', fontWeight: 500, fill: '#111827' }}
        >
          {total}
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fill: TEXT_MUTED }}
        >
          tasks
        </text>
      </svg>

      {/* Legend with values — secondary encoding satisfying CVD relief requirement */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {segments.map((seg) => {
          const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
          return (
            <div
              key={seg.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'default',
                opacity: hovered && hovered !== seg.key ? 0.45 : 1,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={() => setHovered(seg.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: seg.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '12.5px', color: TEXT_SECONDARY, minWidth: '70px' }}>
                {seg.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: '#111827', fontWeight: 500 }}>
                {seg.value}
              </span>
              <span style={{ fontSize: '11.5px', color: TEXT_MUTED }}>
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 2. Priority Column Chart ─────────────────────────────────────────────────
interface PriorityChartProps {
  high: number;
  medium: number;
  low: number;
}

function PriorityChart({ high, medium, low }: PriorityChartProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const bars = [
    { key: 'low', label: 'Low', value: low, color: PRIORITY_COLORS.low },
    { key: 'medium', label: 'Medium', value: medium, color: PRIORITY_COLORS.medium },
    { key: 'high', label: 'High', value: high, color: PRIORITY_COLORS.high },
  ];

  const W = 260, H = 180;
  const mt = 16, mr = 16, mb = 36, ml = 36;
  const plotW = W - ml - mr;
  const plotH = H - mt - mb;

  const maxVal = niceMax(Math.max(high, medium, low, 1));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * maxVal));

  const barW = Math.min(24, (plotW / bars.length) * 0.45);
  const slotW = plotW / bars.length;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="Tasks by priority"
    >
      <g transform={`translate(${ml},${mt})`}>
        {/* Hairline gridlines */}
        {ticks.map((t) => {
          const y = plotH - (t / maxVal) * plotH;
          return (
            <g key={t}>
              <line x1={0} y1={y} x2={plotW} y2={y} stroke={GRIDLINE} strokeWidth={1} />
              <text
                x={-6}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fill: TEXT_MUTED }}
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Baseline */}
        <line x1={0} y1={plotH} x2={plotW} y2={plotH} stroke={GRIDLINE} strokeWidth={1} />

        {/* Bars */}
        {bars.map((bar, i) => {
          const barH = maxVal > 0 ? (bar.value / maxVal) * plotH : 0;
          const x = i * slotW + (slotW - barW) / 2;
          const y = plotH - barH;
          const isHovered = hovered === bar.key;

          return (
            <g
              key={bar.key}
              onMouseEnter={() => setHovered(bar.key)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              {/* Bar body (square at baseline) */}
              {barH > 0 && (
                <rect
                  x={x}
                  y={y + 4}
                  width={barW}
                  height={Math.max(barH - 4, 0)}
                  fill={bar.color}
                  opacity={hovered && !isHovered ? 0.4 : 1}
                  style={{ transition: 'opacity 0.15s' }}
                />
              )}
              {/* Rounded top cap (4px) */}
              {barH > 4 && (
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={8}
                  rx={4}
                  ry={4}
                  fill={bar.color}
                  opacity={hovered && !isHovered ? 0.4 : 1}
                  style={{ transition: 'opacity 0.15s' }}
                />
              )}
              {/* Value label at top */}
              {barH > 0 && (
                <text
                  x={x + barW / 2}
                  y={y - 5}
                  textAnchor="middle"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500, fill: isHovered ? '#111827' : TEXT_SECONDARY }}
                >
                  {bar.value}
                </text>
              )}
              {/* X-axis label */}
              <text
                x={x + barW / 2}
                y={plotH + 18}
                textAnchor="middle"
                style={{ fontFamily: 'var(--font-ui)', fontSize: '11px', fill: TEXT_MUTED }}
              >
                {bar.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ─── 3. Employee Workload Horizontal Bar ─────────────────────────────────────
interface EmployeeBarProps {
  data: Array<{ name: string; count: number }>;
}

function EmployeeBar({ data }: EmployeeBarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (data.length === 0) {
    return (
      <div style={{ padding: '24px 0', textAlign: 'center', fontSize: '13px', color: TEXT_MUTED }}>
        No employee data yet
      </div>
    );
  }

  const ROW_H = 32;
  const BAR_H = 18;
  const ml = 120, mr = 52, mt = 8, mb = 8;
  const W = 520;
  const plotW = W - ml - mr;
  const H = mt + data.length * ROW_H + mb;

  const maxVal = niceMax(Math.max(...data.map((d) => d.count), 1));

  const ticks = [0, 0.5, 1].map((f) => Math.round(f * maxVal));

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="Tasks per employee"
    >
      <g transform={`translate(${ml},${mt})`}>
        {/* Hairline vertical gridlines */}
        {ticks.map((t) => {
          const x = (t / maxVal) * plotW;
          return (
            <g key={t}>
              <line x1={x} y1={0} x2={x} y2={data.length * ROW_H} stroke={GRIDLINE} strokeWidth={1} />
              <text
                x={x}
                y={data.length * ROW_H + 16}
                textAnchor="middle"
                style={{ fontFamily: 'var(--font-ui)', fontSize: '10px', fill: TEXT_MUTED }}
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((emp, i) => {
          const barW = maxVal > 0 ? (emp.count / maxVal) * plotW : 0;
          const y = i * ROW_H + (ROW_H - BAR_H) / 2;
          const isHovered = hovered === emp.name;

          return (
            <g
              key={emp.name}
              onMouseEnter={() => setHovered(emp.name)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              {/* Employee name */}
              <text
                x={-8}
                y={i * ROW_H + ROW_H / 2}
                textAnchor="end"
                dominantBaseline="middle"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '12px',
                  fill: isHovered ? '#111827' : TEXT_SECONDARY,
                  transition: 'fill 0.1s',
                }}
              >
                {emp.name.length > 16 ? emp.name.slice(0, 15) + '…' : emp.name}
              </text>

              {/* Bar body */}
              {barW > 0 && (
                <>
                  <rect
                    x={0}
                    y={y}
                    width={Math.max(barW - 4, 0)}
                    height={BAR_H}
                    fill={SERIES_1}
                    opacity={hovered && !isHovered ? 0.35 : 1}
                    style={{ transition: 'opacity 0.15s' }}
                  />
                  {/* Rounded right cap */}
                  <rect
                    x={Math.max(barW - 8, 0)}
                    y={y}
                    width={8}
                    height={BAR_H}
                    rx={4}
                    ry={4}
                    fill={SERIES_1}
                    opacity={hovered && !isHovered ? 0.35 : 1}
                    style={{ transition: 'opacity 0.15s' }}
                  />
                </>
              )}

              {/* Value label at right end */}
              <text
                x={barW + 8}
                y={i * ROW_H + ROW_H / 2}
                dominantBaseline="middle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  fill: isHovered ? '#111827' : TEXT_SECONDARY,
                }}
              >
                {emp.count}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
interface ChartSectionProps {
  summary: DashboardSummary;
}

export default function ChartSection({ summary }: ChartSectionProps) {
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboardCharts()
      .then(setCharts)
      .catch(() => null)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', color: 'var(--color-primary)' }}>
        <Spinner size={24} />
      </div>
    );
  }

  if (!charts) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
      {/* Row 1: Status donut + Priority columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap)' }}>
        <ChartCard title="Task status">
          <StatusDonut
            pending={summary.pendingTasks}
            inProgress={summary.inProgressTasks}
            completed={summary.completedTasks}
          />
        </ChartCard>

        <ChartCard title="Tasks by priority">
          <PriorityChart
            high={charts.byPriority.high}
            medium={charts.byPriority.medium}
            low={charts.byPriority.low}
          />
        </ChartCard>
      </div>

      {/* Row 2: Employee workload */}
      {charts.byEmployee.length > 0 && (
        <ChartCard title="Workload by employee">
          <EmployeeBar data={charts.byEmployee} />
        </ChartCard>
      )}
    </div>
  );
}
