import json
from datetime import date
from itertools import zip_longest
import base64

from odoo import http
from odoo.http import request

from odoo.addons.g2p_service_provider_beneficiary_management.controllers.main import G2PServiceProviderBeneficiaryManagement

from odoo.addons.g2p_service_provider_portal_base.controllers.main import ServiceProviderBaseContorller

from odoo.addons.g2p_service_provider_portal.controllers.main import ServiceProviderContorller


class AtiServiceProviderContorller(ServiceProviderContorller):
    @http.route(["/serviceprovider/home"], type="http", auth="user", website=True)
    def portal_home(self, **kwargs):
        # domain = []
        # domain.append(("is_group", "=", True))
        households = request.env["res.partner"].sudo().search([("is_group", "=", True)])
        individuals = request.env["res.partner"].sudo().search([("is_group", "=", False)])


        return request.render(
            "g2p_ati_service_provider_portal.ati_dashboard_template",
        {"households": households,
         "individuals": individuals
         }
        )
class AtiserviceProviderBeneficiaryManagement(G2PServiceProviderBeneficiaryManagement):

    @http.route(
        ["/serviceprovider/group/create/"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def group_create(self, **kw):
        gender = request.env["gender.type"].sudo().search([])
        region = request.env["g2p.region"].sudo().search([])
        zone = request.env["g2p.zone"].sudo().search([])
        woreda = request.env["g2p.woreda"].sudo().search([])
        kebele = request.env["g2p.kebele"].sudo().search([])
        primary_language = request.env["g2p.lang"].sudo().search([])
        primary_cooperatives = request.env["g2p.primary.cooperative"].sudo().search([])
        cooperative_unions = request.env["g2p.cooperative.union"].sudo().search([])
        primary_commodities = request.env["g2p.primary.commodity"].sudo().search([])
        crops = request.env["g2p.crop"].sudo().search([])
        crop_illness_type = request.env["g2p.illness.type"].sudo().search([('illness_type', '=', 'crop')])
        crop_water_source = request.env["g2p.water.source"].sudo().search([])
        livestock_types = request.env["g2p.livestock.type"].sudo().search([])
        livestock_illness_type = request.env["g2p.illness.type"].sudo().search([('illness_type', '=', 'animal')])
        water_source = request.env["g2p.water.source"].sudo().search([])
        machinary_types = request.env["g2p.machinery"].sudo().search([])
        financial_access = request.env["g2p.finance.access"].sudo().search([])
        source_of_income = request.env["g2p.hh.income"].sudo().search([])

        model_id = request.env["ir.model"].sudo().search([("model", "=", "res.partner")])
        land_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.land.information")])
        crop_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.crop.information")])
        livestock_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.livestock.information")])

        ownership_type_selections = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", land_model_id.id), ("name", "=", "ownership_type")])
            .selection_ids
        )

        crop_is_diseased_selections = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", crop_model_id.id), ("name", "=", "is_diseased")])
            .selection_ids
        )

        livestock_is_diseased_selections = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", livestock_model_id.id), ("name", "=", "is_diseased")])
            .selection_ids
        )

        serialized_crop_info_data = []
        serialized_livestock_info_data = []

        have_national_id = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "have_national_id")])
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

        is_member_in_farmer_cluster = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "is_member_in_farmer_cluster")])
            .selection_ids
        )

        role_in_cluster = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "role_in_farmer_cluster")])
            .selection_ids
        )

        access_to_machinery = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "access_to_machinery")])
            .selection_ids
        )

        has_finance_access = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "has_finace_access")])
            .selection_ids

        )

        marital_status = (
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

        farming_type = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "farming_type")])
            .selection_ids
        )

        disability_status = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "is_disabled")])
            .selection_ids
        )

        has_personal_phone = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "has_personal_phone")])
            .selection_ids
        )

        return request.render(
            "g2p_ati_service_provider_portal.ati_create_group_form_template",
            {
                "have_national_id": have_national_id,
                "gender": gender,
                "region": region,
                "zone": zone,
                "woreda": woreda,
                "kebele": kebele,
                "primary_language": primary_language,
                "has_personal_phone": has_personal_phone,
                "farming_type": farming_type,
                "is_member_of_primary_cooperative": is_member_of_primary_cooperative,
                "is_member_of_cooperative_union": is_member_of_cooperative_union,
                "is_member_in_farmer_cluster": is_member_in_farmer_cluster,
                "primary_cooperatives": primary_cooperatives,
                "cooperative_unions": cooperative_unions,
                "primary_commodities": primary_commodities,
                "role_in_cluster": role_in_cluster,
                "serialized_crop_info_data": serialized_crop_info_data,
                "serialized_livestock_info_data": serialized_livestock_info_data,
                "crops": crops,
                "crop_illness_type": crop_illness_type,
                "crop_water_source": crop_water_source,
                "livestock_types": livestock_types,
                "livestock_illness_type": livestock_illness_type,
                "water_source": water_source,
                "access_to_machinery": access_to_machinery,
                "machinary_types": machinary_types,
                "marital_status": marital_status,
                "education_level": education_level,
                "disability_status": disability_status,
                "has_finance_access": has_finance_access,
                "financial_access": financial_access,
                "source_of_income": source_of_income,
                "ownership_type_selections": ownership_type_selections,
                "crop_is_diseased_selections": crop_is_diseased_selections,
                "livestock_is_diseased_selections": livestock_is_diseased_selections
            },
        )

    @http.route(
        ["/serviceprovider/group/create/submit"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def group_create_submit(self, **kw):

        try:
            beneficiary_id = int(kw.get("group_id"))

            beneficiary = request.env["res.partner"].sudo().browse(beneficiary_id)

            if not beneficiary:
                return request.render(
                    "g2p_service_provider_beneficiary_management.error_template",
                    {"error_message": "Beneficiary not found."},
                )

            for key, value in kw.items():
                if key in beneficiary:
                    beneficiary.write({key: value})
                else:
                    print(f"Ignoring invalid key: {key}")

            return request.redirect("/serviceprovider/group")

        except Exception as e:
            return request.render(
                "g2p_service_provider_beneficiary_management.error_template",
                {"error_message": "An error occurred. Please try again later."},
            )

    @http.route(
        ["/get_selection_name"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def get_selection(self, selectedValue=None, **kwargs):
        name = request.env["ir.model.fields.selection"].sudo().search([("id", "=", selectedValue)]).name
        return json.dumps([{"name": name}])

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
        primary_language = request.env["g2p.lang"].sudo().search([])
        primary_cooperatives = request.env["g2p.primary.cooperative"].sudo().search([])
        cooperative_unions = request.env["g2p.cooperative.union"].sudo().search([])
        primary_commodities = request.env["g2p.primary.commodity"].sudo().search([])
        crops = request.env["g2p.crop"].sudo().search([])
        crop_illness_type = request.env["g2p.illness.type"].sudo().search([('illness_type', '=', 'crop')])
        crop_water_source = request.env["g2p.water.source"].sudo().search([])
        livestock_types = request.env["g2p.livestock.type"].sudo().search([])
        livestock_illness_type = request.env["g2p.illness.type"].sudo().search([('illness_type', '=', 'animal')])
        water_source = request.env["g2p.water.source"].sudo().search([])
        machinary_types = request.env["g2p.machinery"].sudo().search([])
        financial_access = request.env["g2p.finance.access"].sudo().search([])
        source_of_income = request.env["g2p.hh.income"].sudo().search([])


        model_id = request.env["ir.model"].sudo().search([("model", "=", "res.partner")])
        land_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.land.information")])
        crop_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.crop.information")])
        livestock_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.livestock.information")])

        ownership_type_selections = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id","=",land_model_id.id), ("name","=","ownership_type")])
            .selection_ids
        )

        crop_is_diseased_selections = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id","=",crop_model_id.id), ("name","=","is_diseased")])
            .selection_ids
        )

        livestock_is_diseased_selections = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id","=",livestock_model_id.id), ("name","=","is_diseased")])
            .selection_ids
        )
        
        serialized_crop_info_data = []
        serialized_livestock_info_data = []
        
        have_national_id = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "have_national_id")])
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
        
        is_member_in_farmer_cluster = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "is_member_in_farmer_cluster")])
            .selection_ids
        )

        role_in_cluster = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "role_in_farmer_cluster")])
            .selection_ids
        )

        access_to_machinery = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "access_to_machinery")])
            .selection_ids
        )

        has_finance_access =(
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "has_finace_access")])
            .selection_ids

        )
    
        marital_status = (
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

        farming_type = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "farming_type")])
            .selection_ids
        )

        disability_status = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "is_disabled")])
            .selection_ids
        )

        has_personal_phone = (
            request.env["ir.model.fields"]
            .sudo()
            .search([("model_id", "=", model_id.id), ("name", "=", "has_personal_phone")])
            .selection_ids
        )

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
                "has_personal_phone": has_personal_phone,
                "farming_type": farming_type,
                "is_member_of_primary_cooperative": is_member_of_primary_cooperative,
                "is_member_of_cooperative_union": is_member_of_cooperative_union,
                "is_member_in_farmer_cluster": is_member_in_farmer_cluster,
                "primary_cooperatives": primary_cooperatives,
                "cooperative_unions": cooperative_unions,
                "primary_commodities": primary_commodities,
                "role_in_cluster": role_in_cluster,
                "serialized_crop_info_data": serialized_crop_info_data,
                "serialized_livestock_info_data": serialized_livestock_info_data,
                "crops": crops,
                "crop_illness_type": crop_illness_type,
                "crop_water_source": crop_water_source,
                "livestock_types": livestock_types,
                "livestock_illness_type": livestock_illness_type,
                "water_source": water_source,
                "access_to_machinery": access_to_machinery,
                "machinary_types": machinary_types,
                "marital_status": marital_status,
                "education_level": education_level,
                "disability_status": disability_status,
                "has_finance_access": has_finance_access,
                "financial_access": financial_access,
                "source_of_income": source_of_income,
                "ownership_type_selections": ownership_type_selections,
                "crop_is_diseased_selections": crop_is_diseased_selections,
                "livestock_is_diseased_selections": livestock_is_diseased_selections
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
        try:

            # supporting_documents_ids = []
            # backend_id = (
            #     request.env.ref("storage_backend.default_storage_backend").id
            #     or request.env["storage.backend"].sudo().search([], limit=1).id
            # )
            #
            # doc_tag = request.env["g2p.document.tag"].sudo().get_tag_by_name("Land Certificate")
            # if not doc_tag:
            #     doc_tag = request.env["g2p.document.tag"].sudo().create({"name": "Land Certificate"})
                     
            land_info_data = []
            crop_info_data = []
            livestock_info_data = []

            valid_keys = [key for key in kw.keys() if "{9999}" not in key]
            land_indices = set()
            crop_indices = set()
            livestock_indices = set()
            for key in valid_keys:
                if key.startswith('land_ownership_type_'):
                    try:
                        land_index = int(key.split('_')[-1])
                        land_indices.add(land_index)
                    except ValueError:
                        continue
                if key.startswith('crops_'):
                    try:
                        crop_index = int(key.split('_')[-1])
                        crop_indices.add(crop_index)
                    except ValueError:
                        continue
                if key.startswith('livestock_types_'):
                    try:
                        livestock_index = int(key.split('_')[-1])
                        livestock_indices.add(livestock_index)
                    except ValueError:
                        continue

            # land information
            for index in land_indices:
                ownership_type = kw.get(f'land_ownership_type_{index}')
                if ownership_type == " ":
                    continue
                land_id = kw.get(f'land_id_{index}')
                land_area = kw.get(f'total_land_area_{index}')
                land_ownership_type_id = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", ownership_type)])
                    .value
                )
                land_certificate = kw.get(f'land_certificate_{index}')
                # if land_certificate:
                #         binary_content = base64.b64encode(land_certificate.read()).decode('utf-8')
                #         supporting_documents_ids.append(
                #             (
                #                 0,
                #                 0,
                #                 {
                #                     "backend_id": backend_id,
                #                     "name": land_certificate.filename,
                #                     "data": binary_content,
                #                     "tags_ids": [(4, doc_tag.id)]
                #                 },
                #             )
                #         )
                land_info_data.append((0, 0, {
                    'ownership_type': land_ownership_type_id,
                    'total_land_area': land_area,
                    'land_id': land_id,
                }))
            
            # crop information
            for index in crop_indices:
                crop_id = kw.get(f'crops_{index}')
                if crop_id == " ":
                    continue
                is_diseased = kw.get(f'crop_is_diseased_{index}')
                crop_is_diseased = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", is_diseased)])
                    .value
                )
                crop_illness_types_str = kw.get(f"crop_illness_types_{index}[]")
                crop_illness_type_ids = []
                if crop_illness_types_str:
                    crop_illness_types = crop_illness_types_str.split(',')  # Split by comma
                    crop_illness_type_ids = [int(i.strip()) for i in crop_illness_types if i.strip().isdigit()]  # Convert to int, filter non-digits

                crop_info_data.append((0, 0, {
                    'crop': crop_id,
                    'is_diseased': crop_is_diseased,
                    'illness_type': [(6, 0, crop_illness_type_ids)],
                }))

            # livestock information
            for index in livestock_indices:
                livestock_type = kw.get(f'livestock_types_{index}')
                if livestock_type == " ":
                    continue
                number_of_livestock = kw.get(f'number_of_livestock_{index}')
                is_diseased = kw.get(f'livestock_is_diseased_{index}')
                livestock_is_diseased = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", is_diseased)])
                    .value
                )
                livestock_illness_types_str = kw.get(f"livestock_illness_types_{index}[]")
                livestock_illness_type_ids = []
                if livestock_illness_types_str:
                    livestock_illness_types = livestock_illness_types_str.split(',')  # Split by comma
                    livestock_illness_type_ids = [int(i.strip()) for i in livestock_illness_types if i.strip().isdigit()]  # Convert to int, filter non-digits

                livestock_info_data.append((0, 0, {
                    'livestock_type': livestock_type,
                    'number_of_livestock': number_of_livestock,
                    'is_diseased': livestock_is_diseased,
                    'illness_type': [(6, 0, livestock_illness_type_ids)],
                }))
            
            name = ""

            # INDIVIDUAL DETAILS
            if kw.get("primary_language"):
                primary_Language = kw.get("primary_language")
            if kw.get("given_name"):
                given_name = kw.get("given_name")
                name += kw.get("given_name") + " "
            if kw.get("family_name"):
                family_name = kw.get("family_name")
                name += kw.get("family_name") + " "
            if kw.get("gf_name_eng"):
                gf_name_eng = kw.get("gf_name_eng")
                name += kw.get("gf_name_eng")
            if kw.get("first_name_amh"):
                first_name_amh = kw.get("first_name_amh")
            if kw.get("family_name_amh"):
                family_name_amh = kw.get("family_name_amh")
            if kw.get("gf_name_amh"):
                gf_name_amh = kw.get("gf_name_amh")
            if kw.get("region") != " ":
                region = kw.get("region")
            if kw.get("zone") != " ":
                zone = kw.get("zone")
            if kw.get("woreda") != " ":
                woreda = kw.get("woreda")
            if kw.get("kebele") != " ":
                kebele = kw.get("kebele")
            if kw.get("birthdate") and kw.get("birthdate") != " ":
                birthdate = kw.get("birthdate")
            if kw.get("gender") != " ":
                gender = kw.get("gender")

            if kw.get("has_personal_phone"):
                has_personal_phone = kw.get("has_personal_phone")
            phone_no = []
            if has_personal_phone == "yes":
                phone_no.append((0, 0, {"phone_no": kw.get("primary_phone"), "phone_type": "primary"}))
                if kw.get("secondary_phone") and kw.get("secondary_phone").strip():
                    phone_no.append((0, 0, {"phone_no": kw.get("secondary_phone"), "phone_type": "secondary"}))
            else:
                phone_no.append((0, 0, {"phone_no": kw.get("other_phone"), "phone_type": "other"}))
                if kw.get("secondary_phone") and kw.get("secondary_phone").strip():
                    phone_no.append((0, 0, {"phone_no": kw.get("secondary_phone"), "phone_type": "secondary"}))

            if kw.get("email"):
                email = kw.get("email")
            if kw.get("is_disabled") and kw.get("is_disabled") != " ":
                is_disabled = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("is_disabled"))])
                    .value
                )
            if kw.get("farming_type") and kw.get("farming_type") != " ":
                farming_type = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("farming_type"))])
                    .value
                )
            if kw.get("is_member_of_primary_coop") and kw.get("is_member_of_primary_coop") != " ":
                is_member_of_primary_cooperative = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("is_member_of_primary_coop"))])
                    .value
                )

            # MEMBERSHIP DETAILS
            if kw.get("name_of_primary_coop"):
                primary_cooperatives = kw.get("name_of_primary_coop")
            if kw.get("is_member_of_coop_union") and kw.get("is_member_of_coop_union") != " ":
                is_member_of_cooperative_union = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("is_member_of_coop_union"))])
                    .value
                )
            if kw.get("name_of_coop_union"):
                cooperative_unions = kw.get("name_of_coop_union")
            if kw.get("in_farmer_cluster") and kw.get("in_farmer_cluster") != " ":
                is_member_in_farmer_cluster = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("in_farmer_cluster"))])
                    .value
                )
            if kw.get("primary_commodity"):
                primary_commodity = kw.get("primary_commodity")
            if kw.get("role_in_cluster") and kw.get("role_in_cluster") != " ":
                role_in_farmer_cluster = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("role_in_cluster"))])
                    .value
                )

            # LAND INFORMATION

            # CROP INFORMATION
            crop_ws = request.httprequest.form.getlist("crop_water_source")
            crop_water_sources_ids = [int(id) for id in crop_ws]
            crop_water_sources = [(6, 0, crop_water_sources_ids)]

            # LIVESTOCK INFORMATION
            livestock_ws = request.httprequest.form.getlist("livestock_water_source")
            livestock_water_sources_ids = [int(id) for id in livestock_ws]
            livestock_water_sources = [(6, 0, livestock_water_sources_ids)]
            
            # AGRICULTURAL INPUT
            if kw.get("amount_fertilizer_utilized"):
                amount_fertilizer_utilized = float(kw.get("amount_fertilizer_utilized"))
            if kw.get("amount_insecticide_utilized"):
                amount_insecticide_utilized = float(kw.get("amount_insecticide_utilized"))
            if kw.get("amount_pesticide_utilized"):
                amount_pesticide_utilized = float(kw.get("amount_pesticide_utilized"))
            if kw.get("amount_improved_seed_utilized"):
                amount_improved_seed_utilized = float(kw.get("amount_improved_seed_utilized"))
            
            # ACCESS TO RESOURCE
            access_to_machinery = None
            if kw.get("access_to_machinery") and kw.get("access_to_machinery") != " ":
                access_to_machinery = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("access_to_machinery"))])
                    .value
                )
            if access_to_machinery == 'yes':
                machinery_types = request.httprequest.form.getlist("machinery_types")
                machinery_types_ids = [int(id) for id in machinery_types]
                type_of_machinery = [(6, 0, machinery_types_ids)]
            
            # FINANCIAL SERVICE
            has_finace_access = None
            if kw.get("has_finance_access") and kw.get("has_finance_access") != " ":
                has_finace_access = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("has_finance_access"))])
                    .value
                )
            if has_finace_access == 'yes':
                access_to_finance = request.httprequest.form.getlist("finance_accesses")
                access_to_finance_ids = [int(id) for id in access_to_finance]
                finance_accesses = [(6, 0, access_to_finance_ids)]

            # SOCIO ECONOMIC DATA
            if kw.get("marital_status") and kw.get("marital_status") != " ":
                martial_status = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("marital_status"))])
                    .value
                )
            if kw.get("education_level") and kw.get("education_level") != " ":
                education = (
                    request.env["ir.model.fields.selection"]
                    .sudo()
                    .search([("id", "=", kw.get("education"))])
                    .value
                )
            income_source = request.httprequest.form.getlist("hh_income_type")
            income_source_ids = [int(id) for id in income_source]
            hh_income_type = [(6, 0, income_source_ids)]

            vals = {
                "given_name": given_name,
                "family_name": family_name,
                "gf_name_eng": gf_name_eng,
                "first_name_amh": first_name_amh,
                "family_name_amh": family_name_amh,
                "gf_name_amh": gf_name_amh,
                "name": name,
                "regionn": region,
                "zone": zone,
                "woreda": woreda,
                "kebele": kebele,
                "birthdate": birthdate,
                "gender": gender,
                "phone_number_ids": phone_no,
                "email": email,
                "is_disabled": is_disabled,
                "farming_type": farming_type,
                "is_member_of_primary_cooperative": is_member_of_primary_cooperative,
                "primary_cooperatives": primary_cooperatives,
                "is_member_of_cooperative_union": is_member_of_cooperative_union,
                "cooperative_unions": cooperative_unions,
                "is_member_in_farmer_cluster": is_member_in_farmer_cluster,
                "primary_commodity": primary_commodity,
                "role_in_farmer_cluster": role_in_farmer_cluster,
                # "land_information_ids": land_info_data,
                "crop_water_sources": crop_water_sources,
                "crop_information_ids": crop_info_data,
                "livestock_water_sources": livestock_water_sources,
                "livestock_information_ids": livestock_info_data,
                "amount_fertilizer_utilized": amount_fertilizer_utilized,
                "amount_insecticide_utilized": amount_insecticide_utilized,
                "amount_pesticide_utilized": amount_pesticide_utilized,
                "amount_improved_seed_utilized": amount_improved_seed_utilized,
                "access_to_machinery": access_to_machinery,
                "type_of_machinery": type_of_machinery,
                "has_finace_access": has_finace_access,
                "finance_accesses": finance_accesses,
                "martial_status": martial_status,
                "education": education,
                "hh_income_type": hh_income_type,
                "is_registrant": True,
                "is_group": False,
            }
            print(vals)
            request.env["res.partner"].sudo().create(vals)
            return request.redirect("/serviceprovider/individual")
        
        except Exception as e:
            print(e)
            return request.render(
                "g2p_service_provider_beneficiary_management.error_template",
                {"error_message": f"Error while creating individual, {e}"},
            )

    @http.route(
        ["/serviceprovider/individual/update/<int:_id>"],
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def indvidual_update(self, _id, **kw):
        try:
            beneficiary = request.env["res.partner"].sudo().browse(_id)

            if not beneficiary:
                return request.render(
                    "g2p_service_provider_beneficiary_management.error_template",
                    {"error_message": "Beneficiary not found."},
                )

            gender = request.env["gender.type"].sudo().search([])
            region = request.env["g2p.region"].sudo().search([])
            zone = request.env["g2p.zone"].sudo().search([])
            woreda = request.env["g2p.woreda"].sudo().search([])
            kebele = request.env["g2p.kebele"].sudo().search([])
            primary_language = request.env["g2p.lang"].sudo().search([])
            primary_cooperatives = request.env["g2p.primary.cooperative"].sudo().search([])
            cooperative_unions = request.env["g2p.cooperative.union"].sudo().search([])
            primary_commodities = request.env["g2p.primary.commodity"].sudo().search([])
            crops = request.env["g2p.crop"].sudo().search([])
            crop_illness_type = request.env["g2p.illness.type"].sudo().search([('illness_type', '=', 'crop')])
            crop_water_source = request.env["g2p.water.source"].sudo().search([])
            livestock_types = request.env["g2p.livestock.type"].sudo().search([])
            livestock_illness_type = request.env["g2p.illness.type"].sudo().search([('illness_type', '=', 'animal')])
            water_source = request.env["g2p.water.source"].sudo().search([])
            machinary_types = request.env["g2p.machinery"].sudo().search([])
            financial_access = request.env["g2p.finance.access"].sudo().search([])
            source_of_income = request.env["g2p.hh.income"].sudo().search([])

            model_id = request.env["ir.model"].sudo().search([("model", "=", "res.partner")])
            land_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.land.information")])
            crop_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.crop.information")])
            livestock_model_id = request.env["ir.model"].sudo().search([("model", "=", "g2p.livestock.information")])

            ownership_type_selections = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id","=",land_model_id.id), ("name","=","ownership_type")])
                .selection_ids
            )

            crop_is_diseased_selections = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id","=",crop_model_id.id), ("name","=","is_diseased")])
                .selection_ids
            )

            livestock_is_diseased_selections = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id","=",livestock_model_id.id), ("name","=","is_diseased")])
                .selection_ids
            )
            
            land_info_data = []
            land_index = 1
            for land_info in beneficiary.land_information_ids:
                ownership_selection_id = False
                for choice in ownership_type_selections:
                    if choice.value == land_info.ownership_type:
                        ownership_selection_id = choice.id
                land_info_data.append({
                    "index": land_index,
                    'id': land_info.id,
                    'total_land_area': land_info.total_land_area,
                    'land_id': land_info.land_id,
                    # 'land_certificate': land_info.land_certificate,
                    'ownership_type': land_info.ownership_type,
                    'ownership_type_selection_id': ownership_selection_id
                })
                land_index += 1
                
            crop_info_data = []
            crop_index = 1
            for crop_info in beneficiary.crop_information_ids:
                crop_is_diseased_selection_id = False
                for choice in crop_is_diseased_selections:
                    if choice.value == crop_info.is_diseased:
                        crop_is_diseased_selection_id = choice.id
                crop_info_data.append({
                    "index": crop_index,
                    'id': crop_info.id,
                    'crop': crop_info.crop,
                    'is_diseased': crop_info.is_diseased,
                    'illness_type': crop_info.illness_type,
                    'crop_is_diseased_selection_id': crop_is_diseased_selection_id   
                })
                crop_index += 1
            
            serialized_crop_info_data = []
            for crop_info in crop_info_data:
                serialized_crop_info_data.append({
                    'index': crop_info['index'],
                    'id': crop_info['id'],
                    'crop_id': crop_info['crop'].id,
                    'is_diseased': crop_info['is_diseased'],
                    'illness_type': [it.id for it in crop_info['illness_type']],
                })
                
            livestock_info_data = []
            livestock_index = 1
            for livestock_info in beneficiary.livestock_information_ids:
                livestock_is_diseased_selection_id = False
                for choice in livestock_is_diseased_selections:
                    if choice.value == livestock_info.is_diseased:
                        livestock_is_diseased_selection_id = choice.id
                livestock_info_data.append({
                    'index': livestock_index,
                    'id': livestock_info.id,
                    'livestock_type': livestock_info.livestock_type,
                    'number_of_livestock': livestock_info.number_of_livestock,
                    'is_diseased': livestock_info.is_diseased,
                    'illness_type': livestock_info.illness_type,
                    'livestock_is_diseased_selection_id': livestock_is_diseased_selection_id
                })
                livestock_index += 1
            
            serialized_livestock_info_data = []
            for livestock_info in livestock_info_data:
                serialized_livestock_info_data.append({
                    'index': livestock_info['index'],
                    'id': livestock_info['id'],
                    'livestock_type': livestock_info['livestock_type'].id,
                    'is_diseased': livestock_info['is_diseased'],
                    'illness_type': [it.id for it in livestock_info['illness_type']],
                })
                         
            have_national_id = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "have_national_id")])
                .selection_ids
            )
            have_national_id_selection_id = False
            for choice in have_national_id:
                if choice.value == beneficiary.have_national_id:
                    have_national_id_selection_id = choice.id

            is_member_of_primary_cooperative = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "is_member_of_primary_cooperative")])
                .selection_ids
            )

            is_member_of_primary_cooperative_selection_id = False
            for choice in is_member_of_primary_cooperative:
                if choice.value == beneficiary.is_member_of_primary_cooperative:
                    is_member_of_primary_cooperative_selection_id = choice.id

            is_member_of_cooperative_union = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "is_member_of_primary_cooperative")])
                .selection_ids
            )
            is_member_of_cooperative_union_selection_id = False
            for choice in is_member_of_cooperative_union:
                if choice.value == beneficiary.is_member_of_cooperative_union:
                    is_member_of_cooperative_union_selection_id = choice.id

            is_member_in_farmer_cluster = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "is_member_in_farmer_cluster")])
                .selection_ids
            )

            is_member_in_farmer_cluster_selection_id = False
            for choice in is_member_in_farmer_cluster:
                if choice.value == beneficiary.is_member_in_farmer_cluster:
                    is_member_in_farmer_cluster_selection_id = choice.id

            role_in_cluster = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "role_in_farmer_cluster")])
                .selection_ids
            )
            role_in_cluster_selection_id = False
            for choice in role_in_cluster:
                if choice.value == beneficiary.role_in_farmer_cluster:
                    role_in_cluster_selection_id = choice.id

            access_to_machinery = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "access_to_machinery")])
                .selection_ids
            )

            access_to_machinery_selection_id = False
            for choice in access_to_machinery:
                if choice.value == beneficiary.access_to_machinery:
                    access_to_machinery_selection_id = choice.id

            has_finance_access =(
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "has_finace_access")])
                .selection_ids

            )
            access_to_finance_selection_id = False
            for choice in has_finance_access:
                if choice.value == beneficiary.has_finace_access:
                    access_to_finance_selection_id = choice.id

            marital_status = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "martial_status")])
                .selection_ids
            )
            marital_status_selection_id = False
            for mar_status in marital_status:
                if mar_status.value == beneficiary.martial_status:
                    marital_status_selection_id = mar_status.id

            education_level = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "education")])
                .selection_ids
            )
            education_level_selection_id = False
            for ed_level in education_level:
                if ed_level.value == beneficiary.education:
                    education_level_selection_id = ed_level.id

            farming_type = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "farming_type")])
                .selection_ids
            )
            farming_type_selection_id = False
            for farming_loop in farming_type:
                if farming_loop.value == beneficiary.farming_type:
                    farming_type_selection_id = farming_loop.id

            disability_status = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "is_disabled")])
                .selection_ids
            )
            disability_status_selection_id = False
            for disability in disability_status:
                if disability.value == beneficiary.is_disabled:
                    disability_status_selection_id = disability.id

            has_personal_phone = (
                request.env["ir.model.fields"]
                .sudo()
                .search([("model_id", "=", model_id.id), ("name", "=", "has_personal_phone")])
                .selection_ids
            )
            has_personal_phone_selection_id = False
            for has_phone in has_personal_phone:
                if has_phone.value == beneficiary.has_personal_phone:
                    has_personal_phone_selection_id = has_phone.id

            primary_phone = ""
            other_phone = ""
            secondary_phone = ""
            for phone in beneficiary.phone_number_ids:
                if phone.phone_type == "primary":
                    primary_phone = phone.phone_no
                elif phone.phone_type == "secondary":
                    secondary_phone = phone.phone_no
                elif phone.phone_type == "other":
                    other_phone = phone.phone_no

            uid = ""
            rid = ""
            for reg_id in beneficiary.reg_ids:
                if beneficiary.have_national_id == "yes" and reg_id.id_type.name == "UID":
                    uid = reg_id.value
                elif beneficiary.have_national_id == "no" and reg_id.id_type.name == "RID":
                    rid = reg_id.value

            
            return request.render(
                "g2p_ati_service_provider_portal.ati_individual_registrant_update_form_template",
                {
                    "beneficiary": beneficiary,
                    "have_national_id": have_national_id,
                    "uid": uid,
                    "rid": rid,
                    "gender": gender,
                    "region": region,
                    "zone": zone,
                    "woreda": woreda,
                    "kebele": kebele,
                    "primary_language": primary_language,
                    "has_personal_phone": has_personal_phone,
                    "primary_phone": primary_phone,
                    "secondary_phone": secondary_phone,
                    "other_phone": other_phone,
                    "farming_type": farming_type,
                    "is_member_of_primary_cooperative": is_member_of_primary_cooperative,
                    "is_member_of_cooperative_union": is_member_of_cooperative_union,
                    "is_member_in_farmer_cluster": is_member_in_farmer_cluster,
                    "primary_cooperatives": primary_cooperatives,
                    "cooperative_unions": cooperative_unions,
                    "primary_commodities": primary_commodities,
                    "role_in_cluster": role_in_cluster,
                    "ownership_type_selections": ownership_type_selections,
                    "land_info_data": land_info_data,
                    "crop_info_data": crop_info_data,
                    "serialized_crop_info_data": serialized_crop_info_data,
                    "livestock_info_data": livestock_info_data,
                    "serialized_livestock_info_data": serialized_livestock_info_data,
                    "crops": crops,
                    "crop_illness_type": crop_illness_type,
                    "crop_water_source": crop_water_source,
                    "livestock_types": livestock_types,
                    "livestock_illness_type": livestock_illness_type,
                    "water_source": water_source,
                    "access_to_machinery": access_to_machinery,
                    "machinary_types": machinary_types,
                    "marital_status": marital_status,
                    "education_level": education_level,
                    "disability_status": disability_status,
                    "has_finance_access": has_finance_access,
                    "financial_access": financial_access,
                    "source_of_income": source_of_income,
                    "have_national_id_selection_id": have_national_id_selection_id,
                    "farming_type_selection_id": farming_type_selection_id,
                    "role_in_cluster_selection_id": role_in_cluster_selection_id,
                    "is_member_in_farmer_cluster_selection_id": is_member_in_farmer_cluster_selection_id,
                    "is_member_of_cooperative_union_selection_id": is_member_of_cooperative_union_selection_id,
                    "is_member_of_primary_cooperative_selection_id": is_member_of_primary_cooperative_selection_id,
                    "education_level_selection_id": education_level_selection_id,
                    "marital_status_selection_id": marital_status_selection_id,
                    "access_to_machinery_selection_id": access_to_machinery_selection_id,
                    "access_to_finance_selection_id": access_to_finance_selection_id,
                    "disability_status_selection_id": disability_status_selection_id,
                    "has_personal_phone_selection_id": has_personal_phone_selection_id,
                    "crop_is_diseased_selections": crop_is_diseased_selections,
                    "livestock_is_diseased_selections": livestock_is_diseased_selections
                },
            )

        except Exception as e:
            print(e)
            return request.render(
                "g2p_service_provider_beneficiary_management.error_template",
                {"error_message": "Invalid URL."},
            )

    @http.route(
        "/serviceprovider/individual/update/submit",
        type="http",
        auth="user",
        website=True,
        csrf=False,
    )
    def update_individual_submit(self, **kw):
        print(kw)
        try:
            member = request.env["res.partner"].sudo().browse(int(kw.get("id holder")))

            if member:

                supporting_documents_ids = []
                backend_id = (
                    request.env.ref("storage_backend.default_storage_backend").id
                    or request.env["storage.backend"].sudo().search([], limit=1).id
                )
                
                doc_tag = request.env["g2p.document.tag"].sudo().get_tag_by_name("Land Certificate")
                if not doc_tag:
                    doc_tag = request.env["g2p.document.tag"].sudo().create({"name": "Land Certificate"})
               
                land_info_data = []
                crop_info_data = []
                livestock_info_data = []

                valid_keys = [key for key in kw.keys() if "{9999}" not in key]
                land_indices = set()
                crop_indices = set()
                livestock_indices = set()
                for key in valid_keys:
                    if key.startswith('land_ownership_type_'):
                        try:
                            land_index = int(key.split('_')[-1])
                            land_indices.add(land_index)
                        except ValueError:
                            continue
                    if key.startswith('crops_'):
                        try:
                            crop_index = int(key.split('_')[-1])
                            crop_indices.add(crop_index)
                        except ValueError:
                            continue
                    if key.startswith('livestock_types_'):
                        try:
                            livestock_index = int(key.split('_')[-1])
                            livestock_indices.add(livestock_index)
                        except ValueError:
                            continue

                # land information
                for index in land_indices:
                    ownership_type = kw.get(f'land_ownership_type_{index}')
                    if ownership_type == " ":
                        continue
                    land_id = kw.get(f'land_id_{index}')
                    land_area = kw.get(f'total_land_area_{index}')
                    land_ownership_type_id = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", ownership_type)])
                        .value
                    )
                    land_certificate = kw.get(f'land_certificate_{index}')
                    if land_certificate:
                            binary_content = base64.b64encode(land_certificate.read()).decode('utf-8')
                            supporting_documents_ids.append(
                                (
                                    0,
                                    0,  
                                    {
                                        "backend_id": backend_id,
                                        "name": land_certificate.filename,
                                        "data": binary_content,
                                        "tags_ids": [(4, doc_tag.id)]
                                    },
                                )
                            )
                    land_info_data.append((0, 0, {
                        'ownership_type': land_ownership_type_id,
                        'total_land_area': land_area,
                        'land_id': land_id,
                    }))
                                    
                # crop information
                for index in crop_indices:
                    crop_id = kw.get(f'crops_{index}')
                    if crop_id == " ":
                        continue
                    is_diseased = kw.get(f'crop_is_diseased_{index}')
                    crop_is_diseased = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", is_diseased)])
                        .value
                    )
                    crop_illness_types_str = kw.get(f"crop_illness_types_{index}[]")
                    crop_illness_type_ids = []
                    if crop_illness_types_str:
                        crop_illness_types = crop_illness_types_str.split(',')  # Split by comma
                        crop_illness_type_ids = [int(i.strip()) for i in crop_illness_types if i.strip().isdigit()]  # Convert to int, filter non-digits

                    crop_info_data.append((0, 0, {
                        'crop': crop_id,
                        'is_diseased': crop_is_diseased,
                        'illness_type': [(6, 0, crop_illness_type_ids)],
                    }))

                # livestock information
                for index in livestock_indices:
                    livestock_type = kw.get(f'livestock_types_{index}')
                    if livestock_type == " ":
                        continue
                    number_of_livestock = kw.get(f'number_of_livestock_{index}')
                    is_diseased = kw.get(f'livestock_is_diseased_{index}')
                    livestock_is_diseased = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", is_diseased)])
                        .value
                    )
                    livestock_illness_types_str = kw.get(f"livestock_illness_types_{index}[]")
                    livestock_illness_type_ids = []
                    if livestock_illness_types_str:
                        livestock_illness_types = livestock_illness_types_str.split(',')  # Split by comma
                        livestock_illness_type_ids = [int(i.strip()) for i in livestock_illness_types if i.strip().isdigit()]  # Convert to int, filter non-digits

                    livestock_info_data.append((0, 0, {
                        'livestock_type': livestock_type,
                        'number_of_livestock': number_of_livestock,
                        'is_diseased': livestock_is_diseased,
                        'illness_type': [(6, 0, livestock_illness_type_ids)],
                    }))
                

                primary_Language = member.primary_Language
                given_name = member.given_name
                family_name = member.family_name
                gf_name_eng = member.gf_name_eng
                first_name_amh = member.first_name_amh
                family_name_amh = member.family_name_amh
                gf_name_amh = member.gf_name_amh
                name = ""
                region = member.region
                zone = member.zone
                woreda = member.woreda
                kebele = member.kebele
                birthdate = member.birthdate
                gender = member.gender
                # has_personal_phone = member.has_personal_phone
                email = member.email
                is_disabled = member.is_disabled
                farming_type = member.farming_type
                is_member_of_primary_cooperative = member.is_member_of_primary_cooperative
                primary_cooperatives = member.primary_cooperatives
                is_member_of_cooperative_union = member.is_member_of_cooperative_union
                cooperative_unions = member.cooperative_unions
                is_member_in_farmer_cluster = member.is_member_in_farmer_cluster
                primary_commodity = member.primary_commodity
                role_in_farmer_cluster = member.role_in_farmer_cluster
                martial_status = member.martial_status
                education = member.education
                amount_fertilizer_utilized = member.amount_fertilizer_utilized
                amount_pesticide_utilized = member.amount_pesticide_utilized
                amount_insecticide_utilized = member.amount_insecticide_utilized
                amount_improved_seed_utilized = member.amount_improved_seed_utilized
                crop_water_sources = member.crop_water_sources
                livestock_water_sources = member.livestock_water_sources
                access_to_machinery = member.access_to_machinery
                type_of_machinery = member.type_of_machinery
                has_finace_access = member.has_finace_access
                finance_accesses = member.finance_accesses
                martial_status = member.martial_status
                education = member.education
                hh_income_type = member.hh_income_type

                # INDIVIDUAL DETAILS
                if kw.get("primary_language"):
                    primary_Language = kw.get("primary_language")
                if kw.get("given_name"):
                    given_name = kw.get("given_name")
                    name += kw.get("given_name") + " "
                if kw.get("family_name"):
                    family_name = kw.get("family_name")
                    name += kw.get("family_name") + " "
                if kw.get("gf_name_eng"):
                    gf_name_eng = kw.get("gf_name_eng")
                    name += kw.get("gf_name_eng")
                if kw.get("first_name_amh"):
                    first_name_amh = kw.get("first_name_amh")
                if kw.get("family_name_amh"):
                    family_name_amh = kw.get("family_name_amh")
                if kw.get("gf_name_amh"):
                    gf_name_amh = kw.get("gf_name_amh")
                if kw.get("region") != " ":
                    region = kw.get("region")
                if kw.get("zone") != " ":
                    zone = kw.get("zone")
                if kw.get("woreda") != " ":
                    woreda = kw.get("woreda")
                if kw.get("kebele") != " ":
                    kebele = kw.get("kebele")
                if kw.get("birthdate") and kw.get("birthdate") != " ":
                    birthdate = kw.get("birthdate")
                if kw.get("gender") != " ":
                    gender = kw.get("gender")

                # if kw.get("has_personal_phone"):
                #     has_personal_phone = kw.get("has_personal_phone")
                # phone_no = []
                # if has_personal_phone == "yes":
                #     phone_no.append((0, 0, {"phone_no": kw.get("primary_phone"), "phone_type": "primary"}))
                #     if kw.get("secondary_phone") and kw.get("secondary_phone").strip():
                #         phone_no.append((0, 0, {"phone_no": kw.get("secondary_phone"), "phone_type": "secondary"}))
                # else:
                #     phone_no.append((0, 0, {"phone_no": kw.get("other_phone"), "phone_type": "other"}))
                #     if kw.get("secondary_phone") and kw.get("secondary_phone").strip():
                #         phone_no.append((0, 0, {"phone_no": kw.get("secondary_phone"), "phone_type": "secondary"}))

                if kw.get("email"):
                    email = kw.get("email")
                if kw.get("is_disabled") and kw.get("is_disabled") != " ":
                    is_disabled = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("is_disabled"))])
                        .value
                    )
                if kw.get("farming_type") and kw.get("farming_type") != " ":
                    farming_type = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("farming_type"))])
                        .value
                    )
                if kw.get("is_member_of_primary_coop") and kw.get("is_member_of_primary_coop") != " ":
                    is_member_of_primary_cooperative = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("is_member_of_primary_coop"))])
                        .value
                    )

                # MEMBERSHIP DETAILS
                if kw.get("name_of_primary_coop"):
                    primary_cooperatives = kw.get("name_of_primary_coop")
                if kw.get("is_member_of_coop_union") and kw.get("is_member_of_coop_union") != " ":
                    is_member_of_cooperative_union = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("is_member_of_coop_union"))])
                        .value
                    )
                if kw.get("name_of_coop_union"):
                    cooperative_unions = kw.get("name_of_coop_union")
                if kw.get("in_farmer_cluster") and kw.get("in_farmer_cluster") != " ":
                    is_member_in_farmer_cluster = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("in_farmer_cluster"))])
                        .value
                    )
                if kw.get("primary_commodity"):
                    primary_commodity = kw.get("primary_commodity")
                if kw.get("role_in_cluster") and kw.get("role_in_cluster") != " ":
                    role_in_farmer_cluster = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("role_in_cluster"))])
                        .value
                    )

                # LAND INFORMATION

                # CROP INFORMATION
                crop_ws = request.httprequest.form.getlist("crop_water_source")
                crop_water_sources_ids = [int(id) for id in crop_ws]
                crop_water_sources = [(6, 0, crop_water_sources_ids)]

                # LIVESTOCK INFORMATION
                livestock_ws = request.httprequest.form.getlist("livestock_water_source")
                livestock_water_sources_ids = [int(id) for id in livestock_ws]
                livestock_water_sources = [(6, 0, livestock_water_sources_ids)]
                
                # AGRICULTURAL INPUT
                if kw.get("amount_fertilizer_utilized"):
                    amount_fertilizer_utilized = float(kw.get("amount_fertilizer_utilized"))
                if kw.get("amount_insecticide_utilized"):
                    amount_insecticide_utilized = float(kw.get("amount_insecticide_utilized"))
                if kw.get("amount_pesticide_utilized"):
                    amount_pesticide_utilized = float(kw.get("amount_pesticide_utilized"))
                if kw.get("amount_improved_seed_utilized"):
                    amount_improved_seed_utilized = float(kw.get("amount_improved_seed_utilized"))
                
                # ACCESS TO RESOURCE
                if kw.get("access_to_machinery") and kw.get("access_to_machinery") != " ":
                    access_to_machinery = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("access_to_machinery"))])
                        .value
                    )
                if access_to_machinery == 'yes':
                    machinery_types = request.httprequest.form.getlist("machinery_types")
                    machinery_types_ids = [int(id) for id in machinery_types]
                    type_of_machinery = [(6, 0, machinery_types_ids)]
                
                # FINANCIAL SERVICE
                if kw.get("has_finance_access") and kw.get("has_finance_access") != " ":
                    has_finace_access = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("has_finance_access"))])
                        .value
                    )
                if has_finace_access == 'yes':
                    access_to_finance = request.httprequest.form.getlist("finance_accesses")
                    access_to_finance_ids = [int(id) for id in access_to_finance]
                    finance_accesses = [(6, 0, access_to_finance_ids)]

                # SOCIO ECONOMIC DATA
                if kw.get("marital_status") and kw.get("marital_status") != " ":
                    martial_status = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("marital_status"))])
                        .value
                    )
                if kw.get("education") and kw.get("education") != " ":
                    education = (
                        request.env["ir.model.fields.selection"]
                        .sudo()
                        .search([("id", "=", kw.get("education"))])
                        .value
                    )
                income_source = request.httprequest.form.getlist("hh_income_type")
                income_source_ids = [int(id) for id in income_source]
                hh_income_type = [(6, 0, income_source_ids)]
 
                # member.phone_number_ids.unlink()
                # member.land_information_ids.unlink()
                member.crop_information_ids.unlink()
                member.livestock_information_ids.unlink()
                member.sudo().write(
                    {
                        "given_name": given_name,
                        "family_name": family_name,
                        "gf_name_eng": gf_name_eng,
                        "name": name,
                        "land_information_ids": land_info_data,
                        "crop_information_ids": crop_info_data,
                        "livestock_information_ids": livestock_info_data,
                        # "supporting_documents_ids": supporting_documents_ids,
                    }
                )
                # member.sudo().write(
                #     {
                #         "given_name": given_name_eng,
                #         "family_name": father_name_eng,
                #         "gf_name_eng": grandfather_name_eng,
                #         "name": name,
                #         "gender": gender,
                #         "land_information_ids": land_information,
                #         "amount_insecticide_utilized": insecticide,
                #         "amount_fertilizer_utilized": fertilizer,
                #         "amount_imporved_seed_utilized": imporved_seed,
                #         "amount_pesticide_utilized": pesticide,
                #         "region": region,
                #         "zone": zone,
                #         "woreda": woreda,
                #         "crop_water_sources": crop_water_sources,
                #         "livestock_water_sources": livestock_water_sources,
                #         "type_of_machinery": type_of_machinery,
                #         "finance_accesses": finance_accesses,
                #         "is_disabled": is_disabled,
                #         "martial_status": martial_status,
                #         "education": education,
                #         # "have_national_id": have_national_id,
                #         # "birthdate": birthdate,
                #         # "email": kw.get("email"),
                #         # "phone_number_ids": phone_no,
                #         "is_registrant": True,
                #         "is_group": False,
                #     }
                # )
                # member.sudo().write(
                #     {
                #         "applicant_consent": consent,
                #         "given_name": kw.get("given_name"),
                #         "addl_name": kw.get("addl_name"),
                #         "family_name": kw.get("family_name"),
                #         "uid": kw.get("uid"),
                #         "rid": kw.get("rid"),
                #         "name": name,
                #         "have_national_id": have_national_id,
                #         "birthdate": birthdate,
                #         "gender": gender,
                #         "email": kw.get("email"),
                #         "is_registrant": True,
                #         "is_group": False,
                #         "religion": religion,
                #         "other_religion": kw.get("other_religion"),
                #         "region": region,
                #         "zone": zone,
                #         "woreda": woreda,
                #         "kebele": kw.get("kebele"),
                #         "current_region": current_region,
                #         "current_zone": current_zone,
                #         "current_woreda": current_woreda,
                #         "current_kebele": kw.get("current_kebele"),
                #         "postal_code": kw.get("postal_code"),
                #         "phone_number_ids": phone_no,
                #         "disability_status": disability_status,
                #         "disability": disability,
                #         "marital_status": marital_status,
                #         "other_marital_status": kw.get("other_marital_status"),
                #         "male_below_six": male_below_six,
                #         "male_6_to_11": male_6_to_11,
                #         "male_12_and_above": male_12_and_above,
                #         "female_below_six": female_below_six,
                #         "female_6_to_11": female_6_to_11,
                #         "female_12_and_above": female_12_and_above,
                #         "homeless_date": homeless_date,
                #         "other_homeless_reason": kw.get("other_homeless_reason"),
                #         "challenges_on_street": selected_challenges_ids,
                #         "other_challenges_on_street": kw.get("specify-challenge"),
                #         "spend_night": spend_night,
                #         "other_spend_night": kw.get("other_spend_night"),
                #         "other_source_income": kw.get("other_source_income"),
                #         "earn_per": earn_per,
                #         "amount": amount,
                #         "saving_experience": saving_experience,
                #         "received_any_assistance": received_any_assistance,
                #         "inistitutes": inistitutes,
                #         "specify_inistitutes": kw.get("specify_inistitutes"),
                #         "current_other_source_income": kw.get("current_other_source_income"),
                #         "current_earn_per": current_earn_per,
                #         "current_amount": current_amount,
                #         "current_received_any_assistance": current_received_any_assistance,
                #         "current_institutes": current_institutes,
                #         "specify_current_inistitutes": kw.get("current_institutes"),
                #         "additional_support": additional_support,
                #         "additional_support_options": [(6, 0, selected_addtional_support_is)],
                #         "other_additional_support": kw.get("other_additional_support"),
                #         "enumerator_consent": enumerator_consent,
                #         "name_consent": kw.get("name_consent"),
                #         "date_consent": date_consent,
                #         "current_source_income": current_source_income,
                #         "homeless_reason": [(6, 0, selected_reason_ids)],
                #         "source_income": source_income,
                #         "mother_tongue": kw.get("mother_tongue"),
                #         "other_education": kw.get("other_education"),
                #         "hotspot": hotspot,
                #         "current_postal_code": kw.get("current_postal_code"),
                #         "education": education,
                #         "social_worker": kw.get("social_worker"),
                #         "language": [(6, 0, request.httprequest.form.getlist("lang"))],
                #         "other_language": kw.get("other_lang"),
                #         "other_mother_tongue": kw.get("other_language"),
                #         "other_disability": kw.get("other_disability"),
                #     }
                # )
            return request.redirect("/serviceprovider/individual")

        except Exception as e:
            print(e)
            # _logger.error("Error occurred%s" % e)
            return request.render(
                "g2p_service_provider_beneficiary_management.error_template",
                {"error_message": "An error occurred. Please try again later."},
            )