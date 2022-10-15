import React from 'react'
import Section from '../../components/section/Section'
import ServiceUpdate from "../../components/service-form/SeviceUpdate"

function ServiceUpdateScreen() {
  return (
    <>
    <Section title="Update service" icon="truck">
      <ServiceUpdate />
    </Section>
    </>
  )
}

export default ServiceUpdateScreen