import React from 'react'
import Section from '../../components/section/Section'
import OfferForm from '../../components/offer-form/OfferForm'

function OfferCreateForm() {
  return (
    <>
      <Section title="Register an offer" icon="archive">
        <OfferForm />
      </Section>
    </>
  )
}

export default OfferCreateForm