import React from 'react'
import PropTypes from 'prop-types'

import LoadSpin from '../ui/LoadSpin'

import '../../styles/v2/components/ui/render.scss'

const RenderFallback = ({
                          fadeEffect = true,
                          text = 'Rendering visualization...',
                          loadSpinSize = 85,
                          loadSpinColor = '#005eaa',
                          loadSpinOpacity = 30
                        }) => {
  return (
    <div className="cove-render">
      <div className="cove-render__content">
        <div className={`cove-render__text${fadeEffect ? ' cove-render__text--animate' : ''}`}>
          {text}
        </div>
        <LoadSpin size={loadSpinSize} color={loadSpinColor} opacity={loadSpinOpacity}/>
      </div>
    </div>
  )
}

RenderFallback.propTypes = {
  fadeEffect: PropTypes.bool,
  text: PropTypes.string,
  loadSpinSize: PropTypes.number,
  loadSpinColor: PropTypes.string,
  /* Define the opacity of the loadspinner */
  loadSpinOpacity: PropTypes.number
}

export default RenderFallback