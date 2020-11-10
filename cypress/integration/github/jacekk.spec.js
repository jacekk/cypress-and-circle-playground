describe('github profile - jacekk', () => {
	it('should have overview page', () => {
		cy.visit('https://github.com/jacekk');

		cy.get('.js-pinned-items-reorder-list ')
			.find('.pinned-item-list-item-content span.repo')
			.should(($spans) => {
				const titles = Array.from($spans).map((i) => i.textContent);
				const expectedTitles = [
					'collision-detection-on-canvas',
					'matrix-rain-react',
					'dead-simple-proxy-server',
					'twisted-php-app',
					'parkly',
					'site-switcher',
				];

				expect($spans).to.have.length(6);
				expect(titles).to.eqls(expectedTitles);
			});
	});

	it('should have repositories tab', () => {
		cy.visit('https://github.com/jacekk?tab=repositories');

		cy.get('nav.UnderlineNav-body a:nth-child(2)')
			.find('.Counter')
			.first()
			.should('have.text', 92);

		cy.get('#your-repos-filter').type('matrix');
		cy.get('.user-repo-search-results-summary').should(($results) => {
			const text = $results.text().trim();
			const normalized = text.replace(/[\t\n\r]/g, '').replace(/([\s]{2,})/g, ' ');

			expect(normalized).to.contain('2 results');
			expect(normalized).to.contain('matching matrix');
		});

		cy.get('.issues-reset-query').click();
		cy.get('.user-repo-search-results-summary').should('have.length', 0);
	});
});
