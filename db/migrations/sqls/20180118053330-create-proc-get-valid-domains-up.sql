CREATE PROCEDURE getValidDomains ()
BEGIN
  SELECT domain FROM valid_domain;
END
