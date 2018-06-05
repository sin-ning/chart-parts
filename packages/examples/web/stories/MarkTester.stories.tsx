// tslint:disable jsx-no-array-literal-props jsx-no-object-literal-props
import React from 'react'
import { storiesOf } from '@storybook/react'
import { StrokeCap } from '@gog/mark-interfaces'
import { SingleMarkTester } from './util'
import * as palette from './palette'

const BASE_ITEM = {
	stroke: palette.CRIMSON,
	fill: palette.GREY,
}

storiesOf('Mark Testers', module)
	.add('Arc', () => (
		<SingleMarkTester
			initialScenegraph={{
				marktype: 'arc',
				items: [
					{
						...BASE_ITEM,
						startAngle: -0.73,
						endAngle: 0.73,
						padAngle: 0,
						innerRadius: 0,
						outerRadius: 50,
						strokeWidth: 4,
						x: 100,
						y: 100,
					},
				],
			}}
			sliders={[
				{ name: 'x' },
				{ name: 'y' },
				{ name: 'startAngle', min: -6.28, max: 6.28, step: 0.1 },
				{ name: 'endAngle', min: -6.28, max: 6.28, step: 0.1 },
				{ name: 'padAngle', min: -6.28, max: 6.28, step: 0.1 },
				{ name: 'innerRadius', max: 100 },
				{ name: 'outerRadius', max: 100 },
				{ name: 'strokeWidth', max: 10 },
			]}
		/>
	))
	.add('Area', () => (
		<SingleMarkTester
			chartWidth={420}
			chartOrigin={[10, 0]}
			initialScenegraph={{
				marktype: 'area',
				items: [
					{
						x: 0,
						y: 98.18,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 80,
						y: 0,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 160,
						y: 47.27,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 240,
						y: 76.36,
						y2: 200,
						...BASE_ITEM,
					},
					{
						x: 400,
						y: 25.4545,
						y2: 200,
						...BASE_ITEM,
					},
				],
			}}
		/>
	))
	.add('Rect', () => (
		<SingleMarkTester
			initialScenegraph={{
				marktype: 'rect',
				items: [
					{
						x: 50,
						y: 50,
						width: 75,
						height: 75,
						cornerRadius: 0,
						stroke: palette.CRIMSON,
						fill: palette.GREY,
						strokeWidth: 4,
					},
				],
			}}
			sliders={[
				{ name: 'x' },
				{ name: 'y' },
				{ name: 'width' },
				{ name: 'height' },
				{ name: 'cornerRadius', max: 15 },
				{ name: 'strokeWidth', max: 10 },
			]}
			dropdowns={[]}
		/>
	))
	.add('Rule', () => (
		<SingleMarkTester
			initialScenegraph={{
				marktype: 'rule',
				items: [
					{
						x: 50,
						y: 50,
						x2: 100,
						y2: 100,
						stroke: palette.CRIMSON,
						strokeWidth: 4,
						strokeCap: 'butt',
						strokeDash: '[1,0]',
					},
				],
			}}
			sliders={[
				{ name: 'x' },
				{ name: 'y' },
				{ name: 'x2' },
				{ name: 'y2' },
				{ name: 'strokeWidth', max: 10 },
			]}
			dropdowns={[
				{ name: 'strokeCap', options: ['butt', 'round', 'square'] },
				{
					name: 'strokeDash',
					options: ['1,0', '8,8', '4,4', '4,2', '2,1', '1,1'],
				},
			]}
		/>
	))