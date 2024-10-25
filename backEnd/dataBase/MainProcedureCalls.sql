CALL insert_session_data(
    'Session 9',  	-- session name
    '2024-10-04',  	-- session date
    6001, 			-- location id
    7001,			-- result id
    8004,			-- stage id 
    9001, 			-- title id
    10001,			-- vehicle id
    103,			-- total score
    '2024-10-04',  	-- class date
    '2024-10-04', 	-- yard date
    'sunny',		-- weather
    'highway',		-- traffic
    'Malir road',	-- route
    1001,			-- created user id
    20021,          -- Driver ID
    '2001',          -- Trainer IDs
    '[{"slavecategoryid": 5,"activityid": 1, "assessmenttype": "Initial", "score": 1, "assessmentdate": "2024-10-04"},
      {"slavecategoryid": 5,"activityid": 1, "assessmenttype": "Middle", "score": 2, "assessmentdate": "2024-10-04"},
      {"slavecategoryid": 5,"activityid": 1, "assessmenttype": "Final", "score": 3, "assessmentdate": "2024-10-04"}]'  -- Assessment data as JSON
);

CALL `consulttrain`.`update_session_data`(20, '2024-10-18', null, null, null,null, null, 8, null, null, null,null, null, 1001, 
'[{"slavecategoryid": 5,"activityid": 1, "assessmenttype": "Initial", "score": 1, "assessmentdate": "2024-10-04"},
      {"slavecategoryid": 5,"activityid": 1, "assessmenttype": "Middle", "score": 2, "assessmentdate": "2024-10-04"},
      {"slavecategoryid": 5,"activityid": 1, "assessmenttype": "Final", "score": 3, "assessmentdate": "2024-10-04"}]'
);


CALL get_session_data('41103-0237290-5', 'CONT-993', 'Session 2','Final');
CALL get_session_data(NULL,NULL,NULL,NULL);
CALL get_session_data(NULL,NULL,'Session 2',NULL);

SELECT 
      sc.id AS categoryId, 
      sc.name AS categoryName, 
      a.id AS activityId, 
      a.name AS activityName,
      sc.initials as categoryInitials,
      a.initials as activityInitials
    FROM slavecategory sc
    LEFT JOIN activity a ON sc.id = a.slavecategoryid
    and a.active = 1
    and sc.active=1;