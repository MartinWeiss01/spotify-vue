const TIME_RANGE = 'All time'

describe("Your Top Artists", () => {
  it("Change Time Range", () => {
    cy.tokenSignIn()
    cy.visit('/')
    let artist: string = '';
    cy.get('.v-slide-group__content')
      .first()
      .find(':first-child')
      .find('p.mt-2')
      .invoke('text')
      .then(text => { artist = text });

    cy.log(artist)
    cy.contains('button', TIME_RANGE).click()
    cy.wait(1000)

    cy.get('.v-slide-group__content')
      .first()
      .find(':first-child')
      .find('p.mt-2')
      .invoke('text')
      .then(newText => {
        expect(newText).not.to.eq(artist);
      });
    cy.log(artist)
  })
})

describe("Your Top Tracks", () => {
  it("Change Time Range", () => {
    cy.tokenSignIn()
    cy.visit('/')
    let track: string = '';
    cy.get('.v-slide-group__content')
      .eq(1)
      .find(':first-child')
      .find('p.mt-2')
      .invoke('text')
      .then(text => { track = text });

    cy.log(track)
    cy.contains('button', TIME_RANGE).click()
    cy.wait(1000)

    cy.get('.v-slide-group__content')
      .eq(1)
      .find(':first-child')
      .find('p.mt-2')
      .invoke('text')
      .then(newText => {
        expect(newText).not.to.eq(track);
      });
    cy.log(track)
  })
})