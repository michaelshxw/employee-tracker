USE employee_db;

INSERT INTO department (name)
VALUES 
('Photographers'),
('Camera Department'),
('Lighting Department'),
('Prop Department'),
('Accounting Department'),
('Marketing Department');

INSERT INTO role (title, salary, department_id)
VALUES
('Photographer', 90000, 1),
('Photo Assistant', 70000, 2),
('Lighting Crew', 50000, 3),
('Prop Designer', 70000, 4),
('Accountant', 90000, 5),
('Social Media Representative', 40000, 6);

INSERT INTO employee (first_name, last_name, role_id) 
VALUES 
('John', 'Franksten', 1),
('Susan', 'Collins', 3),
('Frankie', 'Sinatra', 1),
('Ellie', 'Dickerson', 5),
('Paul', 'Indie', 2),
('Andy', 'Blake', 2),
('Hamish', 'Lee', 3),
('Sophie', 'Naughton', 1),
('Gabby', 'Scones', 4)