import { Axis, AxisOrientation, ViewSize } from '@gog/interfaces'
import { SceneFrame } from '../SceneFrame'
import { AxisSpace } from '../../interfaces'
import { AxisContext } from './interfaces'

export function getContext(
	axis: Axis,
	frame: SceneFrame,
	axisSpace: AxisSpace,
): AxisContext {
	// Create the new axis space
	const thickness = getThickness(axis, axisSpace)
	const axisFrame = frame.pushView(
		getScaleSize(axis, axisSpace, thickness, frame.view),
		getScaleTL(axis, axisSpace, frame.view),
		getScaleBR(axis, axisSpace, frame.view),
	)

	const scaleName = axis.scale
	const scale = axisFrame.scales[scaleName]
	const range: [number, number] = ((scale.range && scale.range()) as [
		number,
		number
	]) || [0, 0]

	const horizontal =
		axis.orient === AxisOrientation.Top ||
		axis.orient === AxisOrientation.Bottom

	return {
		axis,
		range,
		scale,
		thickness,
		horizontal,
		frame: axisFrame,
		rangeStartProperty: horizontal ? 'x' : 'y',
		rangeEndProperty: horizontal ? 'x2' : 'y2',
		crossStartProperty: horizontal ? 'y' : 'x',
		crossEndProperty: horizontal ? 'y2' : 'x2',
	}
}

function getThickness(axis: Axis, space: AxisSpace) {
	switch (axis.orient) {
		case AxisOrientation.Top:
			return space.top
		case AxisOrientation.Right:
			return space.right
		case AxisOrientation.Bottom:
			return space.bottom
		case AxisOrientation.Left:
			return space.left
		default:
			return 0
	}
}

function getScaleTL(
	axis: Axis,
	space: AxisSpace,
	availableSpace: ViewSize,
): [number, number] {
	const { width, height } = availableSpace
	const { left, top, bottom, right } = space

	switch (axis.orient) {
		case AxisOrientation.Top:
			return [0, left]
		case AxisOrientation.Bottom:
			return [height - bottom, left]
		case AxisOrientation.Left:
			return [top, 0]
		case AxisOrientation.Right:
			return [top, width - right]
	}
}

function getScaleBR(
	axis: Axis,
	space: AxisSpace,
	availableSpace: ViewSize,
): [number, number] {
	const { width, height } = availableSpace
	const { left, top, bottom, right } = space

	switch (axis.orient) {
		case AxisOrientation.Top:
			return [top, width - right]
		case AxisOrientation.Bottom:
			return [height, width - right]
		case AxisOrientation.Left:
			return [height - bottom, left]
		case AxisOrientation.Right:
			return [height - bottom, width]
	}
}

function getScaleSize(
	axis: Axis,
	space: AxisSpace,
	axisThickness: number,
	availableSpace: ViewSize,
) {
	const { left, right, top, bottom } = space
	const { height: viewHeight = 0, width: viewWidth = 0 } = availableSpace
	const isHorizontal =
		axis.orient === AxisOrientation.Top ||
		axis.orient === AxisOrientation.Bottom
	if (isHorizontal) {
		return {
			width: viewWidth - left - right,
			height: axisThickness,
		}
	} else {
		return {
			width: axisThickness,
			height: viewHeight - top - bottom,
		}
	}
}
