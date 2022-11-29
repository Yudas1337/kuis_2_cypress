const credentials = {
    email: "yudasmalabi@gmail.com",
    password: "123456"
   };

const passwordManager = {
    old_password: "123456",
    new_password: "password",
    repeat_password: "password"
   }

   const loginUsingForm = (credentials) => {
        // Enter username and password in form inputs
        cy.get("input[name=email]").type(credentials.email);
        cy.get("input[name=password]").type(credentials.password).type("{enter}"); // '{enter}' submits the form
        cy.get("button[class='swal-button swal-button--confirm']").type('{enter}');
   
   }

   const tryChangePassword = (passwords) => {
        cy.get("input[name=old_password]").type(passwords.old_password);
        cy.get("input[name=new_password]").type(passwords.new_password);
        cy.get("input[name=repeat_password]").type(passwords.repeat_password);

   }
   
   describe('Test Case For Changing User Password', () => {

    beforeEach('Visit website malangsnack', () => {
        cy.visit("https://malangsnack.000webhostapp.com/index.php?page=login");
        loginUsingForm(credentials)
        cy.location("pathname").should("include", "/index.php");
        cy.get('a[class="nav-link warning"]').click();
        cy.url().should(
            'equal',
            'https://malangsnack.000webhostapp.com/index.php?page=dashboard&content=changePass',
          );
          
     });
     
   
     it('Test Case 1 - successfull change password', () => {
        tryChangePassword(passwordManager);
       
        cy.get("button[name=submit]").click()
        cy.contains('Berhasil ubah password').should('be.visible')
        cy.wait(8000)
        credentials.password = "password"
         
     });

     it('Test Case 2 - Old password not match', () => {
         tryChangePassword(passwordManager);
         cy.get("button[name=submit]").click()
         cy.contains('Password lama tidak cocok').should('be.visible')
         cy.wait(8000)
         passwordManager.old_password = "password"
         passwordManager.new_password = "123456"
      });

      it('Test Case 3 - Repeat password not match', () => {
         tryChangePassword(passwordManager);
         cy.get("button[name=submit]").click()
         cy.contains('Password tidak cocok').should('be.visible')
         cy.wait(8000)
      });

    
   })