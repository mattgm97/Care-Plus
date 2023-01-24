import React from 'react'
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { canUseDOM } from 'vtex.render-runtime'
import FormTitulars from '../FormTitulars'

import { useProduct } from 'vtex.product-context'

import "./global.css"




function OpenForm() {
  const [formVisible, setFormVisible] = useState(false)
  const { product, selectedItem } = useProduct() || {}
  useEffect(() => {
    renderForm()
  }, [formVisible])


  function renderForm() {
    if (canUseDOM && formVisible) {
      const container: HTMLElement | null = document.getElementById("container-form")
      if (container !== null) {
        ReactDOM.render(<FormTitulars product={product} selectedItem={selectedItem} />, container)
      }
    }
  }


  return (
    <div>

      <button
        className="buyPlan"
        id='buyPlanBtn'
        onClick={(evt) => {
          evt.stopPropagation()
          evt.preventDefault()
          setFormVisible(true)
        }}>
        Contratar plano
      </button>
    </div>
  )
}

export default OpenForm
