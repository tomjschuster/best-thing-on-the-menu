CREATE PROCEDURE getPlaceItemsReviews (OUT found BOOLEAN, IN place_id INT)
  BEGIN

    CALL getPlaceById(found, place_id);

    SELECT i.id, i.name
    FROM item i
    WHERE i.place_id = place_id;

    SELECT
      r.id,
      r.item_id,
      u.id user_id,
      u.first_name,
      u.last_name,
      u.photo_url,
      r.stars,
      r.comment
    FROM review r
      INNER JOIN item i ON i.id = r.item_id
      INNER JOIN user u ON u.id = r.user_id
      INNER JOIN place p ON p.id = i.place_id
    WHERE p.id = place_id;
  END
