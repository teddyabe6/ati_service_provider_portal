# Part of OpenG2P. See LICENSE file for full copyright and licensing details.
{
    "name": "OpenG2P Service Provider: ATI",
    "category": "G2P",
    "version": "17.0.1.2.0",
    "sequence": 1,
    "author": "OpenG2P",
    "website": "https://openg2p.org",
    "license": "Other OSI approved licence",
    "development_status": "Alpha",
    "depends": ["g2p_social_registry","g2p_service_provider_beneficiary_management","g2p_registry_base","g2p_service_provider_portal_base","portal"],
    "data": [
        "security/ir.model.access.csv",
        "views/views.xml",
        "views/create_individual.xml",
        "views/update_individual.xml",
        "views/ati_language_dropdown.xml",
    
    ],
    "assets": {"web.assets_backend": []},
    "demo": [],
    "images": [],
    "application": True,
    "installable": True,
    "auto_install": False,
}
