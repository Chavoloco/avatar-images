// avatarTile.cy.tsx
import React from 'react';
import AvatarTile from './AvatarTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

const { _, $ } = Cypress;

describe('<AvatarTile />', () => {
  it('renders', () => {
    cy.mount(<AvatarTile initialAvatarUrl="https://example.com/avatar.jpg" loading={false} onRefresh={cy.stub()} />)
  })
  it('can display the correct avatar image', () => {
    const avatarUrl = "https://example.com/avatar.jpg"
    cy.mount(<AvatarTile initialAvatarUrl={avatarUrl} loading={false} onRefresh={cy.stub()} />)
    cy.wait(5000)
    cy.get('img.avatar-img').should('have.attr', 'src', avatarUrl)
  })
  it('can display the loading spinner when loading', () => {
    cy.mount(<AvatarTile initialAvatarUrl="https://example.com/avatar.jpg" loading={true} onRefresh={cy.stub()} />)
    cy.wait(5000)
    cy.get('.loading-spinner').should('be.visible')
    cy.get('.loading-spinner').find('.fa-spinner').should('exist')
  })
  it('does not display the loading spinner when not loading', () => {
    cy.mount(<AvatarTile initialAvatarUrl="https://example.com/avatar.jpg" loading={false} onRefresh={cy.stub()} />)
    cy.wait(5000)
    cy.get('.loading-spinner').should('not.exist')
  })
  it('can update the avatar image when the initialAvatarUrl changes', () => {
    const initialAvatarUrl = "https://example.com/avatar1.jpg"
    const updatedAvatarUrl = "https://example.com/avatar2.jpg"
    const onRefreshSpy = cy.spy()
    cy.mount(<AvatarTile initialAvatarUrl={initialAvatarUrl} loading={false} onRefresh={onRefreshSpy} />)
    cy.get('img.avatar-img').should('have.attr', 'src', initialAvatarUrl)
    cy.mount(<AvatarTile initialAvatarUrl={updatedAvatarUrl} loading={false} onRefresh={onRefreshSpy} />)
    cy.get('img.avatar-img').should('have.attr', 'src', updatedAvatarUrl)
  })
});
