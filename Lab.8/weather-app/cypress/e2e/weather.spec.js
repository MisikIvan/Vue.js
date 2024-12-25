/// <reference types="cypress" />

describe('Weather App', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Перевірка відображення основних компонентів', () => {
      cy.get('header').should('be.visible')
      cy.get('.search-bar').should('be.visible')
      cy.get('.weather-card').should('be.visible')
      cy.get('.forecast-list').should('be.visible')
      cy.get('.forecast-chart').should('be.visible')
      cy.get('button').contains(/темна тема|светла тема/i).should('be.visible')
    })
  
    it('Тест на введення міста та пошук', () => {
      const city = 'Kyiv'
      cy.get('.search-bar input').type(city)
      cy.get('.search-bar button').click()
  
      // Очікуємо завантаження даних
      cy.get('.weather-card').contains(city, { timeout: 10000 }).should('be.visible')
    })
  
    it('Тест на некоректний запит', () => {
      const invalidCity = 'InvalidCity123'
      cy.get('.search-bar input').type(invalidCity)
      cy.get('.search-bar button').click()
  
      cy.get('.error').should('be.visible').and('contain', 'Місто не знайдено')
    })
  
    it('Перевірка актуальності даних', () => {
      const city = 'London'
      cy.get('.search-bar input').type(city)
      cy.get('.search-bar button').click()
  
      // Перевіряємо, що дані відображаються
      cy.get('.weather-card').contains(city, { timeout: 10000 }).should('be.visible')
      cy.get('.forecast-list li').should('have.length', 4)
    })
  
    it('Тест на відображення графіка прогнозу', () => {
      cy.get('.forecast-chart canvas').should('be.visible')
    })
  
    it('Тест на зміну темної/світлої теми', () => {
      cy.get('button').contains(/темна тема|светла тема/i).as('toggleButton')
      cy.get('body').should('not.have.class', 'dark')
  
      cy.get('@toggleButton').click()
      cy.get('body').should('have.class', 'dark')
  
      cy.get('@toggleButton').click()
      cy.get('body').should('not.have.class', 'dark')
    })
  
    it('Тест на збереження стану теми', () => {
      cy.get('button').contains(/темна тема|светла тема/i).as('toggleButton')
      cy.get('@toggleButton').click()
      cy.get('body').should('have.class', 'dark')
  
      cy.reload()
      cy.get('body').should('have.class', 'dark')
    })
  
    it('Тест на адаптивність: мобільна версія', () => {
      cy.viewport('iphone-6')
      cy.get('.search-bar').should('be.visible')
      cy.get('.weather-card').should('be.visible')
      cy.get('.forecast-list').should('be.visible')
      cy.get('.forecast-chart').should('be.visible')
    })
  
    it('Тест на адаптивність: десктопна версія', () => {
      cy.viewport(1280, 720)
      cy.get('.search-bar').should('be.visible')
      cy.get('.weather-card').should('be.visible')
      cy.get('.forecast-list').should('be.visible')
      cy.get('.forecast-chart').should('be.visible')
    })
  })
  