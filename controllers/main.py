import json
from datetime import date

from odoo import http
from odoo.http import request

from odoo.addons.g2p_service_provider_beneficiary_management.controllers.main import G2PServiceProviderBeneficiaryManagement

from odoo.addons.g2p_service_provider_portal_base.controllers.main import ServiceProviderBaseContorller



class AtiServiceProviderContorller(ServiceProviderBaseContorller):
    @http.route(["/serviceprovider/home"], type="http", auth="user", website=True)
    def portal_home(self, **kwargs):
        self.check_roles("SERVICEPROVIDER")

        return request.redirect("/serviceprovider/individual")

class AtiserviceProviderBeneficiaryManagement(G2PServiceProviderBeneficiaryManagement):

    @http.route(
        ["/update_zone_options"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def update_zone_options(self, region_id=None, **kwargs):
        zones = request.env["g2p.zone"].sudo().search([("region", "=", int(region_id))])
        zone_options = [{"id": zone.id, "name": zone.name} for zone in zones]
        return json.dumps(zone_options)

    @http.route(
        ["/update_woreda_options"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def update_woreda_options(self, zone_id=None, **kwargs):
        woredas = request.env["g2p.woreda"].sudo().search([("zone", "=", int(zone_id))])
        woredas_options = [{"id": woreda.id, "name": woreda.name} for woreda in woredas]
        return json.dumps(woredas_options)

    @http.route(
        ["/serviceprovider/individual/registrar/create/"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def individual_registrar_create(self, **kw):
        gender = request.env["gender.type"].sudo().search([])
        region = request.env["g2p.region"].sudo().search([])
        zone = request.env["g2p.zone"].sudo().search([])

        woreda = request.env["g2p.woreda"].sudo().search([])
        kebele = request.env["g2p.kebele"].sudo().search([])
        primary_language = request.env["res.lang"].sudo().search([])
        primary_cooperatives = request.env["g2p.primary.cooperative"].sudo().search([])
        cooperative_unions = request.env["g2p.cooperative.union"].sudo().search([])
        primary_commodities = request.env["g2p.primary.commodity"].sudo().search([])
        commodities = request.env["g2p.crop"].sudo().search([])
        crop_illness_type = request.env["g2p.crop.illness.type"].sudo().search([])
        crop_water_source = request.env["g2p.water.source"].sudo().search([])
        livestock_types = request.env["g2p.livestock.type"].sudo().search([])
        livestock_illness_types = request.env["g2p.livestock.illness.type"].sudo().search([])
        water_source = request.env["g2p.water.source"].sudo().search([])
        machinary_types = request.env["g2p.machinery"].sudo().search([])


        model_id = request.env["ir.model"].sudo().search([("model", "=", "res.partner")])

        have_national_id = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "have_national_id")])
            .selection_ids
        )

        farming_type = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "farming_type")])
            .selection_ids
        )


        is_member_of_primary_cooperative = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "is_member_of_primary_cooperative")])
            .selection_ids
        )

        is_member_of_cooperative_union = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "is_member_of_primary_cooperative")])
            .selection_ids
        )

        role_in_cluster = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "role_in_farmer_cluster")])
            .selection_ids
        )
        land_ownership = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "land_ownership")])
            .selection_ids
        )
        access_to_machinery = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "access_to_machinery")])
            .selection_ids
        )
        no_finace_access = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "no_finace_access")])
            .selection_ids
        )
        martial_status = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "martial_status")])
            .selection_ids
        )
        education_level = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "education")])
            .selection_ids
        )

        # user_name = request.env.user.name




        return request.render(
            "g2p_ati_service_provider_portal.ati_individual_registrant_form_template",
            {
                "have_national_id": have_national_id,
                "gender": gender,
                "region": region,
                "zone": zone,
                "woreda": woreda,
                "kebele": kebele,
                "primary_language": primary_language,
                "farming_type": farming_type,
                "is_member_of_primary_cooperative": is_member_of_primary_cooperative,
                "is_member_of_cooperative_union": is_member_of_cooperative_union,
                "primary_cooperatives": primary_cooperatives,
                "cooperative_unions": cooperative_unions,
                "primary_commodities": primary_commodities,
                "role_in_cluster": role_in_cluster,
                "land_ownership": land_ownership,
                "commodities": commodities,
                "crop_illness_type": crop_illness_type,
                "crop_water_source": crop_water_source,
                "livestock_types": livestock_types,
                "livestock_illness_types": livestock_illness_types,
                "water_source": water_source,
                "access_to_machinery": access_to_machinery,
                "machinary_types": machinary_types,
                "no_finace_access": no_finace_access,
                "martial_status": martial_status,
                "education_level": education_level,

            },
        )



    @http.route(
        ["/serviceprovider/individual/beneficiary/create/submit"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def individual_create_submit(self, **kw):
        selected_reasons = request.httprequest.form.getlist("homeless_reason[]")
        selected_reason_ids = [int(reason_id) for reason_id in selected_reasons]
        selected_challenges = request.httprequest.form.getlist("challenges_on_street[]")
        selected_challenges_ids = [int(reason_id) for reason_id in selected_challenges]

        additional_support_options = request.httprequest.form.getlist("additional_support_options[]")
        additional_support_options_ids = [int(suport_id) for suport_id in additional_support_options]
        name = ""
        consent = False
        have_national_id = False
        religion = False
        disability_status = False
        marital_status = False
        disability = False
        education = False
        homeless_reason = False
        source_income = False
        earn_per = False
        current_earn_per = False
        current_institutes = False
        enumerator_consent = False
        inistitutes = False
        current_received_any_assistance = False
        additional_support = False
        male_below_six = 0
        male_6_to_11 = 0
        male_12_and_above = 0
        female_below_six = 0
        female_6_to_11 = 0
        female_12_and_above = 0
        region = False
        zone = False
        woreda = False
        current_region = False
        current_zone = False
        current_woreda = False
        hotspot = False
        challenges_on_street = False
        spend_night = False
        language = False
        saving_experience = False
        received_any_assistance = False
        current_source_income = False
        gender = False
        homeless_date = date.today()
        date_consent = date.today()
        birthdate = date.today()

        if kw.get("homeless_date") and kw.get("homeless_date") != " ":
            homeless_date = kw.get("homeless_date")
        if kw.get("date_consent") and kw.get("date_consent") != " ":
            date_consent = kw.get("date_consent")
        if kw.get("birthdate") and kw.get("birthdate") != " ":
            birthdate = kw.get("birthdate")

        if kw.get("region") != " ":
            region = kw.get("region")
        if kw.get("zone") != " ":
            zone = kw.get("zone")
        if kw.get("woreda") != " ":
            woreda = kw.get("woreda")
        if kw.get("current_region") != " ":
            current_region = kw.get("current_region")
        if kw.get("current_zone") != " ":
            current_zone = kw.get("current_zone")
        if kw.get("current_woreda") != " ":
            current_woreda = kw.get("current_woreda")
        if kw.get("hotspot") != " ":
            hotspot = kw.get("hot_spot")
        if kw.get("gender") != " ":
            gender = kw.get("gender")

        if kw.get("male_below_six") != " ":
            male_below_six = kw.get("male_below_six")
        if kw.get("male_6_to_11") != " ":
            male_6_to_11 = kw.get("male_6_to_11")
        if kw.get("male_12_and_above") != " ":
            male_12_and_above = kw.get("male_12_and_above")
        if kw.get("female_below_six") != " ":
            female_below_six = kw.get("female_below_six")
        if kw.get("female_6_to_11") != " ":
            female_6_to_11 = kw.get("female_6_to_11")
        if kw.get("female_12_and_above") != " ":
            female_6_to_11 = kw.get("female_12_and_above")

        if kw.get("family_name"):
            name += kw.get("family_name") + ", "
        if kw.get("given_name"):
            name += kw.get("given_name") + " "
        if kw.get("addl_name"):
            name += kw.get("addl_name") + " "
        if kw.get("religion") and kw.get("religion") != " ":
            religion = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("religion"))])
                .value
            )
        if kw.get("disability_status") and kw.get("disability_status") != " ":
            disability_status = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("disability_status"))])
                .value
            )
        if kw.get("marital_status") and kw.get("marital_status") != " ":
            marital_status = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("marital_status"))])
                .value
            )
        if kw.get("disability") and kw.get("disability") != " ":
            disability = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("disability"))])
                .value
            )
        if kw.get("education") and kw.get("education") != " ":
            education = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("education"))])
                .value
            )
        if kw.get("homeless_reason") and kw.get("homeless_reason") != " ":
            homeless_reason = kw.get("homeless_reason")
        if kw.get("challenges_on_street") and kw.get("challenges_on_street") != " ":
            challenges_on_street = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("challenges_on_street"))])
                .value
            )
        if kw.get("spend_night") and kw.get("spend_night") != " ":
            spend_night = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("spend_night"))])
                .value
            )
        if kw.get("source_income") and kw.get("source_income") != " ":
            source_income = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("source_income"))])
                .value
            )
        if kw.get("earn_per") and kw.get("earn_per") != " ":
            earn_per = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("earn_per"))])
                .value
            )
        if kw.get("saving_experience") and kw.get("saving_experience") != " ":
            saving_experience = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("saving_experience"))])
                .value
            )
        if kw.get("received_any_assistance") and kw.get("received_any_assistance") != " ":
            received_any_assistance = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("received_any_assistance"))])
                .value
            )
        if kw.get("inistitutes-selection") and kw.get("inistitutes-selection") != " ":
            inistitutes = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("inistitutes-selection"))])
                .value
            )
        if kw.get("current_source_income") and kw.get("current_source_income") != " ":
            current_source_income = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("current_source_income"))])
                .value
            )
        if kw.get("current_received_any_assistance") and kw.get("current_received_any_assistance") != " ":
            current_received_any_assistance = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("current_received_any_assistance"))])
                .value
            )
        if kw.get("current_institutes") and kw.get("current_institutes") != " ":
            current_institutes = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("current_institutes"))])
                .value
            )
        if kw.get("additional_support") and kw.get("additional_support") != " ":
            additional_support = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("additional_support"))])
                .value
            )

        if kw.get("consent") and kw.get("consent") != " ":
            consent = (
                request.env["ir.model.fields.selection"].sudo().search([("id", "=", kw.get("consent"))]).value
            )

        if kw.get("have_national_id") and kw.get("have_national_id") != " ":
            have_national_id = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("have_national_id"))])
                .value
            )

        id_num = []
        if kw.get("uid") and kw.get("uid") != " ":
            id_type = request.env["g2p.id.type"].sudo().search([("name", "=", "UID")],limit=1)
            id_num = [
                (0, 0, {"id_type": id_type.id,"value":kw.get("uid")}),
            ]

        if kw.get("rid") and kw.get("rid") != " ":
            id_type = request.env["g2p.id.type"].sudo().search([("name", "=", "RID")], limit=1)
            id_num = [
                (0, 0, {"id_type": id_type.id, "value": kw.get("rid")}),
            ]
        if kw.get("enumerator_consent") and kw.get("enumerator_consent") != " ":
            enumerator_consent = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("enumerator_consent"))])
                .value
            )

        if kw.get("current_earn_per") and kw.get("current_earn_per") != " ":
            current_earn_per = (
                request.env["ir.model.fields.selection"]
                .sudo()
                .search([("id", "=", kw.get("current_earn_per"))])
                .value
            )
        if kw.get("secondary_phone") and kw.get("secondary_phone") != " ":
            phone_no = [
                (0, 0, {"phone_no": kw.get("primary_phone")}),
                (0, 0, {"phone_no": kw.get("secondary_phone")}),
            ]
        else:
            phone_no = [(0, 0, {"phone_no": kw.get("primary_phone")})]
        if kw.get("amount") and kw.get("amount") != " ":
            amount = kw.get("amount")
        else:
            amount = 0
        if kw.get("current_amount") and kw.get("current_amount") != " ":
            current_amount = kw.get("amount")
        else:
            current_amount = 0
        vals = {
            "applicant_consent": consent,
            "have_national_id": have_national_id,
            "uid": kw.get("uid"),
            "rid": kw.get("rid"),
            "given_name": kw.get("given_name"),
            "addl_name": kw.get("addl_name"),
            "family_name": kw.get("family_name"),
            "name": name,
            "birthdate": birthdate,
            "gender": gender,
            "email": kw.get("email"),
            "is_registrant": True,
            "is_group": False,
            "religion": religion,
            "other_religion": kw.get("other_religion"),
            "region": region,
            "zone": zone,
            "woreda": woreda,
            "kebele": kw.get("kebele"),
            "current_region": current_region,
            "current_zone": current_zone,
            "current_woreda": current_woreda,
            "current_kebele": kw.get("current_kebele"),
            "postal_code": kw.get("postal_code"),
            "phone_number_ids": phone_no,
            "disability_status": disability_status,
            "disability": disability,
            "other_disability": kw.get("other_disability"),
            "marital_status": marital_status,
            "other_marital_status": kw.get("other_marital_status"),
            "male_below_six": male_below_six,
            "male_6_to_11": male_6_to_11,
            "male_12_and_above": male_12_and_above,
            "female_below_six": female_below_six,
            "female_6_to_11": female_6_to_11,
            "female_12_and_above": female_12_and_above,
            "homeless_date": homeless_date,
            "other_homeless_reason": kw.get("other_homeless_reason"),
            "challenges_on_street": selected_challenges_ids,
            "other_challenges_on_street": kw.get("specify-challenge"),
            "spend_night": spend_night,
            "other_spend_night": kw.get("other_spend_night"),
            "other_source_income": kw.get("other_source_income"),
            "earn_per": earn_per,
            "amount": amount,
            "saving_experience": saving_experience,
            "received_any_assistance": received_any_assistance,
            "inistitutes": inistitutes,
            "specify_inistitutes": kw.get("specify_inistitutes"),
            "current_other_source_income": kw.get("other_source_income"),
            "current_earn_per": current_earn_per,
            "current_amount": current_amount,
            "current_received_any_assistance": current_received_any_assistance,
            "current_institutes": current_institutes,
            "specify_current_inistitutes": kw.get("current_institutes"),
            "additional_support": additional_support,
            "additional_support_options": [(6, 0, additional_support_options_ids)],
            "other_additional_support": kw.get("other_additional_support"),
            "enumerator_consent": enumerator_consent,
            "name_consent": kw.get("name_consent"),
            "date_consent": date_consent,
            "social_worker": kw.get("social_worker"),
            "current_source_income": current_source_income,
            "homeless_reason": [(6, 0, selected_reason_ids)],
            "source_income": source_income,
            "mother_tongue": kw.get("language"),
            "language": [(6, 0, request.httprequest.form.getlist("lang"))],
            "other_language": kw.get("other_lang"),
            "other_mother_tongue": kw.get("other_language"),
            "other_education": kw.get("other_education"),
            "hotspot": hotspot,
            "current_postal_code": kw.get("current_postal_code"),
            "education": education,
            "reg_ids": id_num,
        }
        request.env["res.partner"].sudo().create(vals)
        return request.redirect("/serviceprovider/individual")

