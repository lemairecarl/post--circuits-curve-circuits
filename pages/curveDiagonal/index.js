import React from 'react'
import { Surface } from 'components/ui'
import Figure from 'components/figure'
import { featureVis } from 'components/helpers'
import Tiles from 'components/tiles'
import { scaleLinear } from 'd3-scale'
import { range } from 'lodash'
import { Icon } from 'evergreen-ui'
import weights from 'components/weights.json'

export const getInitialProps = () => {
  return {}
}

export default class CurveTiles extends React.Component {
  render() {
    const { size = 120 } = this.props
    const scale = scaleLinear().domain([0, 32])

    const upstream = [147, 189, 81, 104, 92, 145, 95, 71, 71, 147]
    const neurons = [379, 406, 385, 343, 342, 388, 324, 340, 330, 349]

    return (
      <Figure>
        <Surface flexFlow="row" alignSelf="center">
          {range(upstream.length).map((index) => (
            <Surface marginX={10}>
              <Surface
                flexFlow="row"
                alignItems="center"
                marginBottom={5}
                alignSelf="center"
              >
                <img
                  width={48}
                  style={{ borderRadius: 5 }}
                  padding={20}
                  src={featureVis('inceptionv1', 'mixed3a', upstream[index])}
                />
                <Icon icon="arrow-right" opacity={0.7} marginX={5} />
                <img
                  style={{ borderRadius: 5 }}
                  width={48}
                  padding={5}
                  src={featureVis('inceptionv1', 'mixed3b', neurons[index])}
                />
              </Surface>
              <Tiles
                size={size}
                grad={weights[upstream[index]][neurons[index]]}
                scale={scale}
              />
            </Surface>
          ))}
        </Surface>
        <figcaption style={{ width: 704, alignSelf: 'center', marginTop: 40 }}>
          The weights connecting 3a early curves with 3b:379 implement
          rotational equivariance. It turns out there are curves of curves
          literally inscribed in the weights of neural networks. We’ll discuss
          equivariance later in this paper, and likely again in the Circuits
          thread in a dedicated paper.
        </figcaption>
      </Figure>
    )
  }
}
