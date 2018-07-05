import {
	Axis,
	MarkType,
	VerticalTextAlignment,
	HorizontalAlignment,
	AxisOrientation,
} from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import {
	AxisContext,
	PositionedTickValue,
	AxisComponent,
} from '../../interfaces'

export class TickLabels implements AxisComponent {
	public createContext(context: Partial<AxisContext>) {
		return { ...context }
	}

	public isScenegraphElementGenerated(context: AxisContext) {
		return !!context.axis.labels
	}

	public createScenegraphElement(context: AxisContext) {
		return buildMark(MarkType.Text)
			.role('axis-tick-labels')
			.items(
				...(context.ticks || []).map(tick => createTickLabel(tick, context)),
			)
			.build()
	}
}

function createTickLabel(tick: PositionedTickValue, context: AxisContext) {
	const { axis, rangeProperty, crossProperty } = context
	const fontSize = axis.labelFontSize as number
	const tickSize = axis.tickSize as number
	const pad = axis.labelPadding as number
	const font = axis.labelFont as string
	const fill = axis.labelColor as string
	const fontWeight = axis.labelFontWeight
	const text = tick.label
	const align = getHorizontalAlignment(axis)
	const baseline = getBaseline(axis)
	const labelAngle = axis.labelAngle

	const crossPropertyValue = context.topOrLeft
		? context.thickness - tickSize - pad
		: tickSize + pad + (axis.orient === AxisOrientation.Bottom ? 1 : 0)

	const result = {
		strokeWidth: 0,
		stroke: 'none',
		[rangeProperty]: tick.position + 1,
		[crossProperty]: crossPropertyValue,
		fontWeight,
		text,
		fill,
		font,
		fontSize,
		baseline,
		align,
	}
	if (labelAngle !== undefined) {
		result.theta = (labelAngle * Math.PI) / 180
	}
	return result
}

function getBaseline(axis: Axis): VerticalTextAlignment {
	if (axis.labelBaseline) {
		return axis.labelBaseline as VerticalTextAlignment
	}
	switch (axis.orient) {
		case AxisOrientation.Top:
			return VerticalTextAlignment.BOTTOM
		case AxisOrientation.Bottom:
			return VerticalTextAlignment.TOP
		case AxisOrientation.Left:
		case AxisOrientation.Right:
			return VerticalTextAlignment.MIDDLE
	}
}

function getHorizontalAlignment(axis: Axis): HorizontalAlignment {
	if (axis.labelAlign !== undefined) {
		return axis.labelAlign as HorizontalAlignment
	}
	switch (axis.orient) {
		case AxisOrientation.Top:
		case AxisOrientation.Bottom:
			return HorizontalAlignment.CENTER
		case AxisOrientation.Left:
			return HorizontalAlignment.RIGHT
		case AxisOrientation.Right:
			return HorizontalAlignment.LEFT
	}
}