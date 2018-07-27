// tslint:disable
import * as React from 'react'
import {
  Axis,
  Chart,
  Rect,
  LinearScale,
  BandScale,
  Dimension,
  Text,
} from '@gog/react'
import {
  AxisOrientation,
  VerticalTextAlignment,
  HorizontalAlignment,
} from '@gog/interfaces'
import { Renderer } from '@gog/react-svg-renderer'

const renderer = new Renderer()

const data = [
  { category: 'A', amount: 28 },
  { category: 'B', amount: 55 },
  { category: 'C', amount: 43 },
  { category: 'D', amount: 91 },
  { category: 'E', amount: 81 },
  { category: 'F', amount: 53 },
  { category: 'G', amount: 19 },
  { category: 'H', amount: 87 },
]

export interface BarChartState {
  hoverRowIndex: number | undefined
}

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export default class BarChart extends React.Component<{}, BarChartState> {
  constructor(props: {}) {
    super(props)
    this.state = { hoverRowIndex: undefined }
  }

  public render() {
    const { hoverRowIndex } = this.state
    return (
      <Chart width={400} height={200} renderer={renderer} data={{ data }}>
        <LinearScale
          name="y"
          table="data"
          domain="amount"
          range={Dimension.Height}
          nice={true}
        />
        <BandScale
          table="data"
          name="x"
          bandWidth="band"
          domain="category"
          padding={0.05}
          range={Dimension.Width}
        />
        <Axis orient={AxisOrientation.Bottom} scale="x" />
        <Axis orient={AxisOrientation.Left} scale="y" />
        <Rect
          table="data"
          onMouseEnter={(evt: any, { index }) => {
            if (hoverRowIndex !== index) {
              this.setState({ hoverRowIndex: index })
            }
          }}
          onMouseLeave={(evt: any, { index }) => {
            if (hoverRowIndex === index) {
              this.setState({ hoverRowIndex: undefined })
            }
          }}
          x={({ datum }, { x }) => x(datum.category)}
          y={({ datum }, { y }) => y(datum.amount)}
          width={(d, { band }) => band()}
          y2={(d, { y }) => y(0)}
          fill={({ index }) =>
            hoverRowIndex === index ? 'firebrick' : 'steelblue'
          }
        />
        {hoverRowIndex === undefined ? null : (
          <Text
            text={d => d.tables.data[hoverRowIndex].amount}
            fill="black"
            x={({ tables }, { x, band }) =>
              x(tables.data[hoverRowIndex].category) + band() / 2
            }
            y={({ tables }, { y }) => y(tables.data[hoverRowIndex].amount) - 3}
            baseline={VerticalTextAlignment.Bottom}
            align={HorizontalAlignment.Center}
          />
        )}
      </Chart>
    )
  }
}