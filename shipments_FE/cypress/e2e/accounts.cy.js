/// <reference types="cypress" />

describe("Accounts", () => {
    it("Should load / url", () => {
        cy.visit("/");
    });

    it("Should load homepage with data", () => {
        cy.request("GET", "http://localhost:8000/api/shipments/").as("items");
        cy.get("@items").then((body) => {
          expect(body.status).to.equal(200);
        });
    });

    it("Should open Create New Account modal and add a new table item", () => {
        cy.get('button[cypressid="open-create-modal-btn"]').contains("Create New Account").click();
        cy.get('div[cypressid="create-acc-modal"]').find('h2').should("contain", 'Create New Account')
        cy.get('div[cypressid="create-acc-modal"] .MuiDialogContent-root')
            .find('input')
            .then((input) => {
                cy.wrap(input[1]).type("Product sku test");
                cy.wrap(input[2]).type("Customer name test");
                cy.wrap(input[3]).type("Delivery address test");
            });
        cy.get('div[cypressid="create-acc-modal"] .MuiDialogContent-root')
            .find('div[cypressid="create-dropdowns"]')
            .then((input) => {
                cy.wrap(input[0]).click()
                cy.get('#menu-').find('li')
                    .then((li) => {
                        cy.wrap(li[0]).click()
                    });

                cy.wrap(input[1]).click()
                cy.get('#menu-').find('li')
                    .then((li) => {
                        cy.wrap(li[0]).click()
                    });
                
            });

            cy.get("table tbody").find("tr").its('length').then(intialLength => {
                cy.get('button[cypressid="modal-create-btn"]').click();

                cy.get("table tbody").find("tr").should("have.length", intialLength + 1);
            });
    });

    it("Should delete first item", () => {
        cy.wait(1000)

        cy.get("table tbody").find("tr").its('length').then(intialLength => {
            cy.get('table tbody tr').first().find('td')
            .then((td) => {
                cy.wrap(td[0]).click()
            });

            cy.get("table tbody").find("tr").should("have.length", intialLength - 1);
        });
    })
});