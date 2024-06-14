import React from 'react'
import AvatarGrid from './AvatarGrid'
const { _, $ } = Cypress;

describe('<AvatarGrid />', () => {
  it('renders', () => {
    cy.mount(<AvatarGrid />)
  })
  it('has image', () => {
    cy.mount(<AvatarGrid/>)
    cy.wait(5000)
    cy.get('.avatar-img').then(($img) => {
      _.each($img.get(), (el, i) => {
        expect($(el)).to.match('img')
      })
    })
  })
  it('has refresh-button', () => {
    cy.mount(<AvatarGrid/>)
    cy.wait(5000)
    cy.get('.refresh-btn').then(($button) => {
      _.each($button.get(), (el, i) => {
        expect($(el)).to.match('button')
      })
    })
  })
  it('can add a new tile', () => {
    cy.mount(<AvatarGrid/>)
    cy.wait(5000)
    let avatarGridLenght: number = 0;
    cy.get('.avatar-tile').its('length').then((l) => {
      avatarGridLenght = l
    })
    cy.get('.plus').click()
    cy.wait(2000)
    cy.get('.avatar-tile').its('length').should('be.gt', avatarGridLenght)
  })
  it('can refresh an image', () => {
    cy.mount(<AvatarGrid/>)
    cy.wait(5000)
    cy.get('.avatar-tile').first().trigger('mouseover').within(() => {
      cy.get('img.avatar-img').invoke('attr', 'src').then((initialSrc) => {
      //cy.get('.avatar-tile').trigger('mouseover').should('be.visible');
        cy.wait(1000)
        cy.get('img.avatar-img').invoke('attr', 'src').then((initialSrc) => {
          cy.get('button.refresh-btn').click({ force: true });
          cy.wait(1000);
          cy.get('img.avatar-img').invoke('attr', 'src').should('not.equal', initialSrc);
        });
      })
    })
  })
  it('can refresh all tiles', () =>{
    cy.mount(<AvatarGrid/>)
    cy.wait(5000)
    const initialSrcs: Array<string> = [];
    cy.get('.avatar-tile img.avatar-img').each(($img) => {
      cy.wrap($img).invoke('attr', 'src').then((src) => {
        if (src) {
          initialSrcs.push(src);  
        }
        
      });
    });
    cy.get('.refresh-all-btn').click();
    cy.wait(5000);
    cy.get('.avatar-tile img.avatar-img').each(($img, index) => {
      cy.wrap($img).invoke('attr', 'src').should('not.equal', initialSrcs[index]);
    });
  })
})  