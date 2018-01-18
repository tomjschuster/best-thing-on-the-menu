CREATE PROCEDURE getPlaces ()
  BEGIN
    SELECT
      p.id,
      p.google_id,
      p.name,
      p.address,
      COUNT(DISTINCT(i.id)) num_items,
      COUNT(*) num_reviews,
      AVG(r.stars) avg_stars
    FROM place p
      LEFT JOIN item i ON i.place_id = p.id
      LEFT JOIN review r ON r.item_id = i.id
    GROUP BY p.id;
  END
