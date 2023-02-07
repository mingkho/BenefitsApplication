using { BenefitsApplication as my } from '../db/schema';

using BenefitsApplication from '../db/schema';

@path : 'service/BenefitsApplication'
service BenefitsApplicationService
{
    entity Claims as
        projection on my.Claims;

    entity Receipts as
        projection on my.Receipts;

    entity ClaimTypes as
        projection on my.ClaimTypes;
}

annotate BenefitsApplicationService with @requires :
[
    'authenticated-user'
];
