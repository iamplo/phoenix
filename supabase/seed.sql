INSERT INTO public.projects (
    id, name, marketing_name, developer, street, city, state, zip_code, neighborhood, borough,
    tax_lot_block, tax_lot_lot, location, total_units, units_sold, units_available, total_floors,
    year_built, architect, building_class, building_type, zoning, status, timeline, price_min,
    price_max, average_price_per_sqft, pricing_strategy, last_price_update, incentives,
    financing_options, has_421a, tax_abatement_expiration, has_485x, affordable_housing_units,
    affordable_housing_percentage, amenities, website, description, created_at, updated_at,
    last_synced_at, created_by, updated_by, deleted_at
) VALUES
-- Project 1: Luxury Manhattan Condo
('11111111-1111-1111-1111-111111111111', 'Central Park Tower', 'The Pinnacle Residences', 'Extell Development Company', '217 W 57th St', 'New York', 'NY', '10019', 'Midtown', 'Manhattan',
 '1027', '33', ST_SetSRID(ST_MakePoint(-73.9819, 40.7655), 4326), 179, 120, 59, 98, 2020, 'Adrian Smith + Gordon Gill', 'Luxury', 'Condo', 'C6-7', 'Active Sales', '{"projectLaunched":"2020-01-01","constructionStarted":"2020-06-01","tcoExpected":"2022-12-31"}', 6500000, 95000000, 7500, 'Market-Based', '2026-03-23T12:00:00.000Z',
 '{"2 years free common charges","Closing cost credit"}', '{"Mortgage available","Developer financing"}', TRUE, '2035-12-31', FALSE, 10, 5.6, '{"buildingAmenities":["Gym","Pool","Doorman","Concierge"],"unitFeatures":["Floor-to-ceiling windows","Smart home system"]}', 'https://centralparktower.com',
 'Luxury condos overlooking Central Park with world-class amenities.', '2026-03-23T12:00:00.000Z', '2026-03-23T12:00:00.000Z', '2026-03-23T12:00:00.000Z', NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING,

-- Project 2: Mid-Market Brooklyn Rental
('22222222-2222-2222-2222-222222222222', 'The Brooklyn Grove', 'Urban Retreat', 'TF Cornerstone', '10 Nevins St', 'Brooklyn', 'NY', '11217', 'Downtown Brooklyn', 'Brooklyn',
 '165', '1', ST_SetSRID(ST_MakePoint(-73.9812, 40.6888), 4326), 184, 150, 34, 27, 2018, 'ODA New York', 'Mid-Market', 'Rental', 'R8A', 'Delivered', '{"projectLaunched":"2018-01-01","constructionStarted":"2018-06-01","tcoExpected":"2020-12-31"}', 3200, 6500, 70, 'Fixed', '2026-03-23T12:00:00.000Z',
 '{"1 month free rent"}', '{"Standard lease","Guarantor accepted"}', FALSE, NULL, FALSE, 20, 10.9, '{"buildingAmenities":["Roof deck","Lounge","Bike storage"],"unitFeatures":["Washer/dryer","Hardwood floors"]}', 'https://thebrooklyngrove.com',
 'Modern rentals in the heart of Brooklyn with curated amenities.', '2026-03-23T12:00:00.000Z', '2026-03-23T12:00:00.000Z', '2026-03-23T12:00:00.000Z', NULL, NULL, NULL
) ON CONFLICT (id) DO NOTHING,

-- Project 3: Affordable Queens Co-op
('33333333-3333-3333-3333-333333333333', 'Queensview', 'Affordable Living', 'Queensview Inc.', '21-66 33rd Rd', 'Queens', 'NY', '11106', 'Astoria', 'Queens',
 '551', '1', ST_SetSRID(ST_MakePoint(-73.9301, 40.7695), 4326), 146, 140, 6, 14, 1950, 'Queensview Architects', 'Affordable', 'Co-op', 'R6', 'Sold Out', '{"projectLaunched":"1950-01-01","constructionStarted":"1950-06-01","tcoExpected":"1952-12-31"}', 350000, 650000, 650, 'Tiered', '2026-03-23T12:00:00.000Z',
 '{"Down payment assistance"}', '{"Co-op financing"}', FALSE, NULL, FALSE, 40, 27.4, '{"buildingAmenities":["Playground","Parking"],"unitFeatures":["Balcony"]}', 'https://queensview.com',
 'Affordable co-op apartments in Astoria, Queens.', '2026-03-23T12:00:00.000Z', '2026-03-23T12:00:00.000Z', '2026-03-23T12:00:00.000Z', NULL, , NULL
) ON CONFLICT (id) DO NOTHING;
