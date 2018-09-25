'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.acme.model.GenerateLOC} generateLOC
 * @transaction
 */

function GenLoc(generateLoc) {

    var locTx = generateLoc.locTx ;
    var userNtn = locTx.buyer.ntn ;
    if (userNtn === 'VERIFIED') {

        locTx.buyer.accountDetails.balance = locTx.buyer.accountDetails.balance - locTx.amount;


        //  locTx.buyer.accountDetails.balance = math.subtract(locTx.buyer.accountDetails.balance,locTx.amount);

        locTx.description ='Loc of ' + locTx.amount + ' is generated' + 'from ' + locTx.buyer.firstName + ' Account Balance is ' + locTx.buyer.accountDetails.balance;

        locTx.status = 'SUCCESS';


        return getAssetRegistry('org.acme.model.Loc')
            .then(function(locRegistry) {
                // save the Buyer
                return locRegistry.update(locTx);

            })

            .then(function(){
                return getAssetRegistry('org.acme.model.AccountDetails')
                    .then(function(AccountDetailsRegistry) {
                        // save the Buyer
                        return AccountDetailsRegistry.update(locTx.buyer.accountDetails);

                    })

            })




    }
}



'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.bank.demo.GenerateLoc} generateLoc
 * @transaction
 */

/*
* Generate Loc
* @param {org.bank.demo.GenerateLoc} generateLoc
* @transaction
*/
function GenLoc(generateLoc) {

    var locTxn = generateLoc.locTxn ;
    var userNtn = locTxn.buyer.ntn;

    if (userNtn === 'VERIFIED') {

        locTxn.buyer.accountDetails.balance -= locTxn.amount;
        locTxn.description ='Loc of ' + locTxn.amount + ' is generated' + 'from ' + locTxn.buyer.firstName;
        locTxn.status = 'SUCCESS';

        return getAssetRegistry('org.bank.demo.Buyer')

            .then(function(BuyerRegistry) {
                // save the Buyer
                return BuyerRegistry.update(locTxn.buyer);

            })

    }
}


/*
* Verify Bol
* @param {org.bank.demo.GenerateBol} generateBol
* @transaction
*/
function VerifyBol(gen6Bol){

    var BolTxn = generateBol.BolTxn ;
    if(BolTxn.buyerListing.status == 'SUCCESS'){
        BolTxn.listing.seller.bln = 'VERIFIED';
        BolTxn.listing.seller.balance += BolTxn.buyerListing.amount;
        BolTxn.description=BolTxn.listing.seller.id + ' Bill of laden is verified and amount of ' + BolTxn.buyerListing.amount + ' is added to seller' + BolTxn.listing.seller.id ;
    }

    return getAssetRegistry('org.bank.demo.GenerateBol')
        .then(function(GenerateBolRegistry) {
            // save the Loc
            return GenerateLocRegistry.update(BolTxn);

        })
        .then(function(SellerRegistry) {
            // save the seller
            return SellerRegistry.update(BolTxn.listing.seller);

        })


}





