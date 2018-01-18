CREATE PROCEDURE getPlaceById (OUT found BOOLEAN, IN place_id INT)
  BEGIN
    SELECT if(COUNT(*) > 0, true, false) FROM place WHERE id = place_id LIMIT 1 INTO found;

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
    WHERE p.id = place_id
    GROUP BY p.id
    LIMIT 1;
  END
