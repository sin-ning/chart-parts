// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@markable/scenegraph'
const data = require('../resources/area_chart.json')

export const scenegraph = parseScene(data)
export const title = 'Area Chart'
export const dimensions = {
	height: 220,
	width: 700,
	origin: [30, 19] as [number, number],
}