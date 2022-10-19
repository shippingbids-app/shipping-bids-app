import React from 'react'
import Section from '../../components/section/Section'
import ServiceUpdate from "../../components/ship-services/service-update/SeviceUpdate"

function ServiceUpdateScreen() {
  return (
    <div className='mt-3'>
    <Section title="Update your services" icon="truck">
      <ServiceUpdate />
    </Section>
    </div>
  )
}

export default ServiceUpdateScreen