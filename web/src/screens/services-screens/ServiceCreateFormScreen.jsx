import React from 'react'
import ServiceForm from '../../components/service-form/ServiceForm'
import Section from "../../components/section/Section"

function ServiceCreateFormScreen() {
  return (
    <>
      <Section title="Services form" icon="truck">
        <ServiceForm />
      </Section>
    </>
  )
}

export default ServiceCreateFormScreen