// tslint:disable no-var-requires
import * as React from 'react'
import { Renderer, VSvgNode, SceneNode } from '@gog/interfaces'
import { VirtualSvgPipeline } from '@gog/core'
import { ChartSpec } from './ChartSpec'
import autobind from 'autobind-decorator'
declare var require: any
const shallowequal = require('shallowequal')

export interface ChartPadding {
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export interface ChartProps {
	width: number
	height: number
	padding?: number | ChartPadding
	data: { [key: string]: any[] }
	renderer: Renderer<VSvgNode, any>
	scene?: SceneNode
}

export interface ChartState {
	/**
	 * The result of the rendering process
	 */
	rendered: React.ReactNode
}

export class Chart extends React.Component<ChartProps, ChartState> {
	private pipeline: VirtualSvgPipeline<React.ReactNode>

	constructor(props: ChartProps) {
		super(props)
		this.pipeline = new VirtualSvgPipeline(props.renderer)
		this.state = { rendered: null }
	}

	public shouldComponentUpdate(props: ChartProps, state: ChartState) {
		return !shallowequal(this.props, props) || !shallowequal(this.state, state)
	}

	public componentDidMount() {
		if (this.props.scene) {
			this.receiveSpec(this.props.scene)
		}
	}

	public render() {
		const { renderer, data, ...props } = this.props
		return (
			<>
				<ChartSpec {...props} onSpecReady={this.receiveSpec}>
					{this.props.children}
				</ChartSpec>
				{this.state.rendered}
			</>
		)
	}

	@autobind
	private receiveSpec(spec: any) {
		const rendered = this.pipeline.handleData(
			spec,
			{
				width: this.props.width,
				height: this.props.height,
				padding: this.props.padding,
			},
			this.props.data,
		)
		this.setState({ rendered })
	}
}