--CREATE DATABASE Car_Rental_System_try
--GO
--USE Car_Rental_System_try
--GO

--CREATE TABLE Users 
--(
--   userID INT IDENTITY(1,1) PRIMARY KEY
--);

--CREATE TABLE UserBio 
--(
--   userID INT PRIMARY KEY,
--   UserName VARCHAR(100) UNIQUE NOT NULL,
--   CNIC_No CHAR(16),
--   Date_of_Birth DATE CHECK (Date_of_Birth < GETDATE()),
--   [Name] VARCHAR(255) NOT NULL,
--   [Role] VARCHAR(20) CHECK ([Role] IN ('Seller', 'Renter', 'Customer')) NOT NULL,
--   Profile_Pic VARCHAR(255),
--   Verification_Status BIT DEFAULT 0,
--   FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
--);
--CREATE TABLE UserAuth 
--(
--   userID INT PRIMARY KEY,
--   Email VARCHAR(255) UNIQUE NOT NULL,
--   Phone_Number VARCHAR(20) UNIQUE,
--   [Password] VARBINARY(256) NOT NULL,
--   Previous_Password VARBINARY(256),
--   CreatedAt DATETIME DEFAULT GETDATE(),
--   UpdatedAt DATETIME DEFAULT GETDATE(),
--   Last_Login DATETIME NULL,
--   Account_Status VARCHAR(20) CHECK (Account_Status IN ('Active', 'Suspended', 'Banned')) DEFAULT 'Active',
--   Failed_Login_Attempts INT DEFAULT 0,
--   Last_Failed_Login DATETIME NULL,
--   FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
--);


--GO
--CREATE TRIGGER trg_UpdateTimestamp
--ON UserAuth
--AFTER UPDATE
--AS
--BEGIN
--   SET NOCOUNT ON;

--   UPDATE ua
--   SET UpdatedAt = GETDATE()
--   FROM UserAuth ua
--   INNER JOIN inserted i ON ua.userID = i.userID;
--END;
--GO

---- -- -- -- -- -- -- GO
---- -- -- -- -- -- -- CREATE TRIGGER trg_UpdateTimestamp_UserAuth
---- -- -- -- -- -- -- ON UserAuth
---- -- -- -- -- -- -- AFTER UPDATE
---- -- -- -- -- -- -- AS
---- -- -- -- -- -- -- BEGIN
---- -- -- -- -- -- --    SET NOCOUNT ON;

---- -- -- -- -- -- --    -- Update only if relevant columns have changed
---- -- -- -- -- -- --    UPDATE ua
---- -- -- -- -- -- --    SET UpdatedAt = GETDATE()
---- -- -- -- -- -- --    FROM UserAuth ua
---- -- -- -- -- -- --    INNER JOIN inserted i ON ua.userID = i.userID
---- -- -- -- -- -- --    INNER JOIN deleted d ON d.userID = i.userID
---- -- -- -- -- -- --    WHERE
---- -- -- -- -- -- --        ISNULL(i.Email, '') <> ISNULL(d.Email, '') OR
---- -- -- -- -- -- --        ISNULL(i.Phone_Number, '') <> ISNULL(d.
--][][=Phone_Number, '') OR
---- -- -- -- -- -- --        ISNULL(i.Password, 0x0) <> ISNULL(d.Password, 0x0) OR
---- -- -- -- -- -- --        ISNULL(i.Previous_Password, 0x0) <> ISNULL(d.Previous_Password, 0x0) OR
---- -- -- -- -- -- --        ISNULL(i.Account_Status, '') <> ISNULL(d.Account_Status, '') OR
---- -- -- -- -- -- --        ISNULL(i.Failed_Login_Attempts, -1) <> ISNULL(d.Failed_Login_Attempts, -1) OR
---- -- -- -- -- -- --        ISNULL(i.Last_Login, '1900-01-01') <> ISNULL(d.Last_Login, '1900-01-01') OR
---- -- -- -- -- -- --        ISNULL(i.Last_Failed_Login, '1900-01-01') <> ISNULL(d.Last_Failed_Login, '1900-01-01');
---- -- -- -- -- -- -- END;
---- -- -- -- -- -- -- GO



-- CREATE TABLE CLIENT 
-- (
--   Client_ID INT IDENTITY(1,1) PRIMARY KEY,
--   userID INT UNIQUE NOT NULL,
--   FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
-- );

-- CREATE TABLE SELLER 
-- (
--   Seller_ID INT PRIMARY KEY,
--   total_cars_sold INT DEFAULT 0,
--   rating FLOAT DEFAULT 0.0 CHECK (rating BETWEEN 0.0 AND 5.0),
--   verification_status BIT DEFAULT 0,
--   FOREIGN KEY (Seller_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
-- );

-- CREATE TABLE RENTER 
-- (
--   Renter_ID INT PRIMARY KEY,
--   total_rentals INT DEFAULT 0,
--   FOREIGN KEY (Renter_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
-- );

--CREATE TABLE Customer 
--(
--   Customer_ID INT PRIMARY KEY,
--   total_cars_purchased INT DEFAULT 0,
--   total_spent DECIMAL(10,2) DEFAULT 0.0,
--   wallet_balance DECIMAL(10,2) DEFAULT 0.0,
--   FOREIGN KEY (Customer_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
--);

-- CREATE TABLE Make 
-- (
--    MakeID INT IDENTITY (1,1) PRIMARY KEY,
--    MakeName VARCHAR (100) UNIQUE NOT NULL,
--    Country VARCHAR (100) NOT NULL
-- );

-- CREATE TABLE Model 
-- (
--    ModelID INT IDENTITY(1,1) PRIMARY KEY,
--    MakeID INT NOT NULL,
--    ModelName VARCHAR(100) NOT NULL,
--    Category VARCHAR(100),
--    UNIQUE (MakeID, ModelName),
--    FOREIGN KEY (MakeID) REFERENCES Make(MakeID) ON DELETE CASCADE
-- );

-- CREATE TABLE Variant 
-- (
--    VariantID INT IDENTITY(1,1) PRIMARY KEY,
--    ModelID INT NOT NULL,
--    VariantName VARCHAR(100) NOT NULL,
--    FuelType VARCHAR(50),
--    Transmission VARCHAR(50),
--    -- -- -- Category VARCHAR(100),
--    -- -- -- UNIQUE (ModelID, VariantName),
--    FOREIGN KEY (ModelID) REFERENCES Model(ModelID) ON DELETE CASCADE
-- );

-- CREATE TABLE VariantColor 
-- (
--    VariantID INT NOT NULL,
--    Color VARCHAR(50) NOT NULL,
--    PRIMARY KEY (VariantID, Color),
--    FOREIGN KEY (VariantID) REFERENCES Variant(VariantID) ON DELETE CASCADE
-- );

-- CREATE TABLE Car 
-- (
--    CarID INT IDENTITY(1,1) PRIMARY KEY,
--    VariantID INT NOT NULL,
--    Color VARCHAR(50) NOT NULL,
--    Year INT CHECK (Year BETWEEN 1900 AND YEAR(GETDATE())),
--    Description TEXT,
--    FOREIGN KEY (VariantID) REFERENCES Variant(VariantID) ON DELETE CASCADE
-- );

-- CREATE TABLE Client_Car -- Car Listings
-- (
--    Client_Car_ID INT IDENTITY (1, 1) PRIMARY KEY,
--    VIN VARCHAR(17) UNIQUE NOT NULL,
--    carID INT NOT NULL,
--    Client_ID INT NOT NULL,
--    -- -- -- Color VARCHAR(10) NOT NULL,
--    Condition VARCHAR(10) CHECK (Condition IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')),
--    [Location] VARCHAR(255),
--    [Availability] BIT DEFAULT 1,  
--    FOREIGN KEY (carID) REFERENCES Car(CarID) ON DELETE CASCADE,
--    FOREIGN KEY (Client_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
-- );

-- CREATE TABLE CARS_ON_SALE 
-- (
--    Sale_Cars_ID INT IDENTITY (1, 1) PRIMARY KEY,
--    Client_Car_ID INT NOT NULL,
--    [State] VARCHAR (10) CHECK ([State] IN ('NEW', 'USED')),
--    Price DECIMAL (10,2) CHECK (Price >= 0),
--    negotiable_price BIT DEFAULT 0,
--    listed_at DATETIME DEFAULT GETDATE(),
--    listing_expiry DATETIME DEFAULT DATEADD (DAY, 30, GETDATE()), -- Expires in 30 days
--    FOREIGN KEY (Client_Car_ID) REFERENCES Client_Car(Client_Car_ID) ON DELETE CASCADE
-- );

-- CREATE TABLE CARS_ON_RENT 
-- (
--    rental_id INT IDENTITY (1,1) PRIMARY KEY,
--    Client_Car_ID INT NOT NULL,
--    [start_date] DATE NOT NULL,
--    end_date DATE NOT NULL,
--    total_price DECIMAL(10,2) CHECK (total_price >= 0),
--    security_deposit DECIMAL(10,2) DEFAULT 0.0,
--    [status] VARCHAR(20) CHECK ([status] IN ('Available', 'Rented', 'Returned','Cancelled')),
--    rented_at DATETIME DEFAULT GETDATE(),
--    extension_requested BIT DEFAULT 0,
--    CONSTRAINT CHK_EndDate CHECK (end_date >= start_date),
--    FOREIGN KEY (Client_Car_ID) REFERENCES Client_Car(Client_Car_ID) ON DELETE CASCADE
-- );


-- CREATE TABLE CAR_RENTAL_HISTORY (
--   history_id INT IDENTITY(1,1) PRIMARY KEY,
--   Customer_User_ID INT NOT NULL,
--   Client_Car_ID INT NOT NULL,
--   Rent_Date DATE NOT NULL,
--   Return_Date DATE NOT NULL,
--   renter_feedback TEXT,
--   FOREIGN KEY (Client_Car_ID) REFERENCES Client_Car(Client_Car_ID) ON DELETE NO ACTION,
--   FOREIGN KEY (Customer_User_ID) REFERENCES Customer(Customer_ID) ON DELETE CASCADE,
--   CONSTRAINT CHK_ReturnDate CHECK (Return_Date >= Rent_Date)
-- );

--CREATE TABLE RATING 
--(
--   Rating_ID INT IDENTITY(1,1) PRIMARY KEY,
--   User_ID INT NOT NULL,
--   Client_Car_ID INT NOT NULL,
--   Rating_Count FLOAT CHECK (Rating_Count BETWEEN 1.0 AND 5.0),
--   Review_ID TEXT NULL,
--   FOREIGN KEY (User_ID) REFERENCES Users(userID) ON DELETE NO ACTION,
--   FOREIGN KEY (Client_Car_ID) REFERENCES Client_Car(Client_Car_ID) ON DELETE NO ACTION
--);

--CREATE TABLE MESSAGE (
--   Message_ID INT IDENTITY(1,1) PRIMARY KEY,
--   Sender_ID INT NOT NULL,
--   Receiver_ID INT ,
--   [Message] TEXT NOT NULL,
--   Sent_Time DATETIME DEFAULT GETDATE(),
--   FOREIGN KEY (Sender_ID) REFERENCES Users(userID) ON DELETE NO ACTION,
--   FOREIGN KEY (Receiver_ID) REFERENCES Users(userID) ON DELETE SET NULL
--);

--CREATE TABLE TRANSACTIONS 
--(
--   transaction_id INT IDENTITY(1,1) PRIMARY KEY,
--   Sender_ID INT NOT NULL,
--   Receiver_ID INT NOT NULL,
--   amount DECIMAL(10,2) NOT NULL,
--   transaction_type VARCHAR(50) CHECK (transaction_type IN ('Rental Payment', 'Car Purchase', 'Refund', 'Penalty', 'Wallet Recharge')) NOT NULL,
--   payment_method VARCHAR(50) CHECK (payment_method IN ('Cash', 'Credit Card', 'Wallet')) DEFAULT 'Wallet',
--   [status] VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'Failed')) DEFAULT 'Pending',
--   transaction_date DATETIME DEFAULT GETDATE(),
--   Reference_ID INT NULL,
--   FOREIGN KEY (Sender_ID) REFERENCES Users(userID) ON DELETE NO ACTION,
--   FOREIGN KEY (Receiver_ID) REFERENCES Users(userID) ON DELETE NO ACTION
--);

-----------------------------------------------------------------------------------------------------------------------

---- Inserting into Users (Base table, no dependencies)
--INSERT INTO Users DEFAULT VALUES; -- userID 1
--INSERT INTO Users DEFAULT VALUES; -- userID 2
--INSERT INTO Users DEFAULT VALUES; -- userID 3

---- Inserting into UserBio (Depends on Users)
--INSERT INTO UserBio (userID, UserName, CNIC_No, Date_of_Birth, [Name], [Role], Profile_Pic)
--VALUES (1, 'john_doe', '12345678901234', '1990-05-15', 'John Doe', 'Customer', 'john_doe.jpg');

--INSERT INTO UserBio (userID, UserName, CNIC_No, Date_of_Birth, [Name], [Role], Profile_Pic)
--VALUES (2, 'jane_smith', '98765432109876', '1985-10-22', 'Jane Smith', 'Seller', 'jane_smith.jpg');

--INSERT INTO UserBio (userID, UserName, CNIC_No, Date_of_Birth, [Name], [Role], Profile_Pic)
--VALUES (3, 'peter_parker', '56789012345678', '2000-01-01', 'Peter Parker', 'Renter', 'peter_parker.jpg');

---- Inserting into UserAuth (Depends on Users)
--INSERT INTO UserAuth (userID, Email, Phone_Number, [Password])
--VALUES (1, 'john.doe@example.com', '123-456-7890', HASHBYTES('SHA2_256', N'password123'));

--INSERT INTO UserAuth (userID, Email, Phone_Number, [Password])
--VALUES (2, 'jane.smith@example.com', '987-654-3210', HASHBYTES('SHA2_256', N'password456'));

--INSERT INTO UserAuth (userID, Email, Phone_Number, [Password])
--VALUES (3, 'peter.parker@example.com', '555-123-4567', HASHBYTES('SHA2_256', N'password789'));


---- Inserting into CLIENT (Depends on Users)
--INSERT INTO CLIENT (userID) VALUES (1); -- Client_ID 1
--INSERT INTO CLIENT (userID) VALUES (2); -- Client_ID 2
--INSERT INTO CLIENT (userID) VALUES (3);  -- Client_ID 3


--INSERT INTO SELLER (Seller_ID, total_cars_sold, rating) VALUES (2, 10, 4.5);


--INSERT INTO RENTER (Renter_ID, total_rentals) VALUES (3, 5);



--INSERT INTO Customer (Customer_ID, total_cars_purchased, total_spent, wallet_balance)
--VALUES (1, 2, 50000.00, 1000.00);

---- Inserting into Make (Independent table)
--INSERT INTO Make (MakeName, Country) VALUES ('Toyota', 'Japan');
--INSERT INTO Make (MakeName, Country) VALUES ('Honda', 'Japan');
--INSERT INTO Make (MakeName, Country) VALUES ('Ford', 'USA');

---- Inserting into Model (Depends on Make)
--INSERT INTO Model (MakeID, ModelName, Category) VALUES (1, 'Corolla', 'Sedan');
--INSERT INTO Model (MakeID, ModelName, Category) VALUES (1, 'Camry', 'Sedan');
--INSERT INTO Model (MakeID, ModelName, Category) VALUES (2, 'Civic', 'Sedan');

---- Inserting into Variant (Depends on Model)
--INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission) VALUES (1, 'LE', 'Gasoline', 'Automatic');
--INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission) VALUES (1, 'XLE', 'Gasoline', 'Automatic');
--INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission) VALUES (3, 'EX', 'Gasoline', 'Manual');

---- Inserting into VariantColor (Depends on Variant)
--INSERT INTO VariantColor (VariantID, Color) VALUES (1, 'Red');
--INSERT INTO VariantColor (VariantID, Color) VALUES (1, 'Blue');
--INSERT INTO VariantColor (VariantID, Color) VALUES (3, 'Silver');

---- Inserting into Car (Depends on Variant, VariantColor)
--INSERT INTO Car (VariantID, Color, Year, Description) VALUES (1, 'Red', 2022, 'Excellent condition, low mileage.');
--INSERT INTO Car (VariantID, Color, Year, Description) VALUES (2, 'Blue', 2023, 'Fully loaded, sunroof.');
--INSERT INTO Car (VariantID, Color, Year, Description) VALUES (3, 'Silver', 2020, 'Good Condition');

---- Inserting into Client_Car (Depends on Car, CLIENT)
--INSERT INTO Client_Car (VIN, carID, Client_ID, Condition, [Location])
--VALUES ('JTDKAR3345JK67890', 1, 2, '9', 'Lahore');  -- Seller 2 lists Car 1
--INSERT INTO Client_Car (VIN, carID, Client_ID, Condition, [Location])
--VALUES ('1FADP5CU2CDL12345', 2, 2, '8', 'Karachi');  -- Seller 2 lists Car 2
--INSERT INTO Client_Car (VIN, carID, Client_ID, Condition, [Location])
--VALUES ('ABCD123EFGHI45678', 3, 3, '7', 'Rawalpindi');  -- Renter 3 lists Car 3

---- Inserting into CARS_ON_SALE (Depends on Client_Car)
--INSERT INTO CARS_ON_SALE (Client_Car_ID, [State], Price) VALUES (1, 'USED', 25000.00);
--INSERT INTO CARS_ON_SALE (Client_Car_ID, [State], Price, negotiable_price) VALUES (2, 'NEW', 35000.00, 1);

---- Inserting into CARS_ON_RENT (Depends on Client_Car)
--INSERT INTO CARS_ON_RENT (Client_Car_ID, [start_date], end_date, total_price, [status])
--VALUES (3, '2025-05-01', '2025-05-05', 200.00, 'Available');
--INSERT INTO CARS_ON_RENT (Client_Car_ID, [start_date], end_date, total_price, [status], security_deposit)
--VALUES (3, '2025-05-10', '2025-05-15', 250.00, 'Available', 50.00);

---- Inserting into CAR_RENTAL_HISTORY (Depends on Customer, Client_Car)
--INSERT INTO CAR_RENTAL_HISTORY (Customer_User_ID, Client_Car_ID, Rent_Date, Return_Date, renter_feedback)
--VALUES (1, 3, '2025-04-20', '2025-04-25', 'Great car, smooth rental process.');
--INSERT INTO CAR_RENTAL_HISTORY (Customer_User_ID, Client_Car_ID, Rent_Date, Return_Date, renter_feedback)
--VALUES (1, 3, '2025-04-26', '2025-04-28', 'Good car');

---- Inserting into RATING (Depends on Users, Client_Car)
--INSERT INTO RATING (User_ID, Client_Car_ID, Rating_Count, Review_ID)
--VALUES (1, 3, 4.8, 'Review123');
--INSERT INTO RATING (User_ID, Client_Car_ID, Rating_Count, Review_ID)
--VALUES (2, 1, 4.2, 'Review456');

---- Inserting into MESSAGE (Depends on Users)
--INSERT INTO MESSAGE (Sender_ID, Receiver_ID, [Message])
--VALUES (1, 2, 'Hello Jane, I am interested in your car.');
--INSERT INTO MESSAGE (Sender_ID, Receiver_ID, [Message])
--VALUES (2, 1, 'Hi John, which car are you referring to?');

---- Inserting into TRANSACTIONS (Depends on Users)
--INSERT INTO TRANSACTIONS (Sender_ID, Receiver_ID, amount, transaction_type, payment_method, [status])
--VALUES (1, 2, 200.00, 'Rental Payment', 'Credit Card', 'Completed');
--INSERT INTO TRANSACTIONS (Sender_ID, Receiver_ID, amount, transaction_type, payment_method, [status])
--VALUES (1, 2, 35000.00, 'Car Purchase', 'Cash', 'Completed');

--------------------------------------------------------------------------------------------------------------------------------------------------------------
---- Views

--GO  -- Remove GO statements, not needed inside an immersive

-- -- View: Available Cars For Sale
-- CREATE VIEW AvailableCarsForSale AS
-- SELECT 
--    CS.Client_Car_ID,
--    MA.MakeName AS Make,
--    MO.ModelName AS Model,
--    CS.Price,
--    CC.[Availability]
-- FROM CARS_ON_SALE CS
-- JOIN Client_Car CC ON CS.Client_Car_ID = CC.Client_Car_ID
-- JOIN Car C ON CC.carID = C.CarID
-- JOIN Variant V ON C.VariantID = V.VariantID
-- JOIN Model MO ON V.ModelID = MO.ModelID
-- JOIN Make MA ON MO.MakeID = MA.MakeID
-- WHERE CC.[Availability] = 1;

-- -- View: Available Cars For Rent
-- CREATE VIEW AvailableCarsForRent AS
-- SELECT 
--    CR.rental_id,
--    MA.MakeName AS Make,
--    MO.ModelName AS Model,
--    CR.total_price,
--    CR.[start_date],
--     CR.end_date,
--     CR.[status]
-- FROM CARS_ON_RENT CR
-- JOIN Client_Car CC ON CR.Client_Car_ID = CC.Client_Car_ID
-- JOIN Car C ON CC.carID = C.CarID
-- JOIN Variant V ON C.VariantID = V.VariantID
-- JOIN Model MO ON V.ModelID = MO.ModelID
-- JOIN Make MA ON MO.MakeID = MA.MakeID
-- WHERE CR.[status] = 'Available';



-- CREATE VIEW AvailableCarsForSale1 AS
-- SELECT 
--    C.CarID,
--    MA.MakeName AS Make,
--    MO.ModelName AS Model,
--    CS.Price,
--    CC.[Availability]
-- FROM CARS_ON_SALE CS
-- JOIN Client_Car CC ON CS.Client_Car_ID = CC.Client_Car_ID
-- JOIN Car C ON CC.carID = C.CarID
-- JOIN Variant V ON C.VariantID = V.VariantID
-- JOIN Model MO ON V.ModelID = MO.ModelID
-- JOIN Make MA ON MO.MakeID = MA.MakeID
-- WHERE CC.[Availability] = 1;

-- CREATE VIEW AvailableCarsForRent1 AS
-- SELECT 
--    C.CarID,
--    MA.MakeName AS Make,
--    MO.ModelName AS Model,
--    CR.total_price,
--    CR.[start_date],
--     CR.end_date,
--     CR.[status]
-- FROM CARS_ON_RENT CR
-- JOIN Client_Car CC ON CR.Client_Car_ID = CC.Client_Car_ID
-- JOIN Car C ON CC.carID = C.CarID
-- JOIN Variant V ON C.VariantID = V.VariantID
-- JOIN Model MO ON V.ModelID = MO.ModelID
-- JOIN Make MA ON MO.MakeID = MA.MakeID
-- WHERE CR.[status] = 'Available';




-- -- View: Top Rated Cars
-- CREATE VIEW TopRatedCars AS
-- SELECT 
--    C.CarID, 
--    MA.MakeName AS Make, 
--    MO.ModelName AS Model, 
--    AVG(R.Rating_Count) AS avgRating
-- FROM RATING R
-- JOIN Client_Car CC ON R.Client_Car_ID = CC.Client_Car_ID
-- JOIN Car C ON CC.carID = C.CarID
-- JOIN Variant V ON C.VariantID = V.VariantID
-- JOIN Model MO ON V.ModelID = MO.ModelID
-- JOIN Make MA ON MO.MakeID = MA.MakeID
-- GROUP BY C.CarID, MA.MakeName, MO.ModelName
-- HAVING AVG(R.Rating_Count) >= 4.0;

-- View: User Rental History
--CREATE VIEW UserRentalHistory AS
--SELECT 
--    CRH.Customer_User_ID AS RenterID,  -- Changed to Customer_User_ID
--    MA.MakeName AS Make,
--    MO.ModelName AS Model,
--    CRH.Rent_Date, 
--    CRH.Return_Date
--FROM CAR_RENTAL_HISTORY CRH
--JOIN Client_Car CC ON CRH.Client_Car_ID = CC.Client_Car_ID
--JOIN Car C ON CC.carID = C.CarID
--JOIN Variant V ON C.VariantID = V.VariantID
--JOIN Model MO ON V.ModelID = MO.ModelID
--JOIN Make MA ON MO.MakeID = MA.MakeID;

--------------------------------------------------------------------------------------------------------------------------------------------------------------
-- 1 SignUpUser
--DROP PROCEDURE IF EXISTS SignUpUser;
--GO
--CREATE PROCEDURE SignUpUser
--    @UserName VARCHAR(100),
--    @Name VARCHAR(255),
--    @Role VARCHAR(20),
--    @Phone_Number VARCHAR(20),
--    @Email VARCHAR(255),
--    @Password NVARCHAR(255)
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRY
--        BEGIN TRANSACTION;

--        INSERT INTO Users DEFAULT VALUES;
--        DECLARE @UserID INT = SCOPE_IDENTITY();

--        INSERT INTO UserBio(userID, UserName, [Name], [Role])
--        VALUES(@UserID, @UserName, @Name, @Role);

--        INSERT INTO UserAuth(userID, Email, Phone_Number, [Password])
--        VALUES(@UserID, @Email, @Phone_Number, HASHBYTES('SHA2_256', @Password));

--        INSERT INTO CLIENT(userID) VALUES(@UserID);

--        IF @Role = 'Seller'
--            INSERT INTO SELLER(Seller_ID) SELECT Client_ID FROM CLIENT WHERE userID = @UserID;
--        ELSE IF @Role = 'Renter'
--            INSERT INTO RENTER(Renter_ID) SELECT Client_ID FROM CLIENT WHERE userID = @UserID;
--        ELSE IF @Role = 'Customer'
--            INSERT INTO Customer(Customer_ID) SELECT Client_ID FROM CLIENT WHERE userID = @UserID;

--        COMMIT;
--    END TRY
--    BEGIN CATCH
--        ROLLBACK;
--        THROW;
--    END CATCH
--END;
--GO

-- 2 LoginUser
--DROP PROCEDURE IF EXISTS LoginUser;
--GO
--CREATE PROCEDURE LoginUser
--    @UserName VARCHAR(100),
--    @Password NVARCHAR(255)
--AS
--BEGIN
--    SET NOCOUNT ON;

--    DECLARE @UserID INT,
--            @StoredPassword VARBINARY(256),
--            @FailedAttempts INT,
--            @AccountStatus VARCHAR(20);

--    SELECT @UserID=ua.userID, @StoredPassword=ua.[Password], @FailedAttempts=ua.Failed_Login_Attempts, @AccountStatus=ua.Account_Status 
--    FROM UserAuth ua
--    JOIN UserBio ub ON ua.userID = ub.userID
--    WHERE ub.UserName = @UserName;

--    IF @UserID IS NULL
--    BEGIN
--        RAISERROR ('User not found.', 16, 1);
--        RETURN;
--    END

--    IF @FailedAttempts >= 5
--    BEGIN
--        UPDATE UserAuth SET Account_Status = 'Suspended' WHERE userID = @UserID;
--        RAISERROR ('Account is suspended due to too many failed login attempts.', 16, 1);
--        RETURN;
--    END

--    IF @StoredPassword = HASHBYTES('SHA2_256', @Password)
--    BEGIN
--        UPDATE UserAuth 
--        SET Last_Login = GETDATE(), Failed_Login_Attempts = 0 
--        WHERE userID = @UserID;

--        SELECT ub.userID, ub.UserName, ub.Role, ua.Last_Login
--        FROM UserBio ub
--        JOIN UserAuth ua ON ub.userID = ua.userID
--        WHERE ub.userID = @UserID;
--    END
--    ELSE
--    BEGIN
--        UPDATE UserAuth SET Failed_Login_Attempts = Failed_Login_Attempts + 1 WHERE userID = @UserID;
--        RAISERROR ('Invalid login credentials!', 16, 1);
--    END
--END;
--GO


-- 3 UpdateProfile
-- DROP PROCEDURE IF EXISTS UpdateProfile;
-- GO
--CREATE PROCEDURE UpdateProfile
--    @UserID INT,
--    @Name VARCHAR(255) = NULL,
--    @Phone_Number VARCHAR(20) = NULL,
--    @Email VARCHAR(255) = NULL,
--    @Profile_Pic VARCHAR(255) = NULL
--AS
--BEGIN
--    SET NOCOUNT ON;

--    UPDATE UserBio
--    SET Name = ISNULL(@Name, Name)
--    WHERE userID = @UserID;

--    UPDATE UserAuth
--    SET 
--        Phone_Number = ISNULL(@Phone_Number, Phone_Number),
--        Email = ISNULL(@Email, Email),
--        UpdatedAt = GETDATE()
--    WHERE userID = @UserID;

--    IF @Profile_Pic IS NOT NULL
--    BEGIN
--        UPDATE UserBio SET Profile_Pic = @Profile_Pic WHERE userID = @UserID;
--    END
--END;
--GO
-- 4 AddCar
-- DROP PROCEDURE IF EXISTS AddCar;
-- GO
-- CREATE PROCEDURE AddCar
--    @VariantID INT,
--    @Color VARCHAR(50),
--    @Year INT,
--    @Description TEXT
-- AS
-- BEGIN
--    SET NOCOUNT ON;

--    INSERT INTO Car (VariantID, Color, Year, Description)
--    VALUES (@VariantID, @Color, @Year, @Description);
-- END;
-- Go

-- --5 AddCarForSale
-- DROP PROCEDURE IF EXISTS AddCarForSale;
-- GO
-- CREATE PROCEDURE AddCarForSale
--    @carID INT,
--    @Client_ID INT,
--    @VIN VARCHAR(17),
--    @Condition VARCHAR(10),
--    @Location VARCHAR(255),
--    @State VARCHAR(10),
--    @Price DECIMAL(10,2),
--    @Negotiable BIT = 0
-- AS
-- BEGIN
--    SET NOCOUNT ON;

--    DECLARE @ClientCarID INT;

--    INSERT INTO Client_Car (VIN, carID, Client_ID, Condition, Location)
--    VALUES (@VIN, @carID, @Client_ID, @Condition, @Location);

--    SET @ClientCarID = SCOPE_IDENTITY();

--    INSERT INTO CARS_ON_SALE (Client_Car_ID, [State], Price, negotiable_price)
--    VALUES (@ClientCarID, @State, @Price, @Negotiable);
-- END;
-- GO

-- -- Drop the procedure if it already exists
-- DROP PROCEDURE IF EXISTS AddCarForRent;
-- GO

-- CREATE PROCEDURE AddCarForRent
--     @Client_Car_ID INT,
--     @start_date DATE,
--     @end_date DATE,
--     @total_price DECIMAL(10,2),
--     @security_deposit DECIMAL(10,2) = 0.00
-- AS
-- BEGIN
--     SET NOCOUNT ON;
    
--     -- Validate dates
--     IF @end_date < @start_date
--     BEGIN
--         RAISERROR('End date must be after start date', 16, 1);
--         RETURN;
--     END
    
--     -- Check if car exists
--     IF NOT EXISTS (SELECT 1 FROM Client_Car WHERE Client_Car_ID = @Client_Car_ID)
--     BEGIN
--         RAISERROR('Car not found', 16, 1);
--         RETURN;
--     END
    
--     -- Insert into CARS_ON_RENT
--     INSERT INTO CARS_ON_RENT 
--         (Client_Car_ID, [start_date], end_date, total_price, security_deposit, [status])
--     VALUES 
--         (@Client_Car_ID, @start_date, @end_date, @total_price, @security_deposit, 'Available');
    
--     -- Update car availability
--     UPDATE Client_Car
--     SET Availability = 0
--     WHERE Client_Car_ID = @Client_Car_ID;
    
--     -- Return the new rental ID
--     SELECT SCOPE_IDENTITY() AS rental_id;
-- END;
-- GO

-- 6 AddCarReview
--DROP PROCEDURE IF EXISTS AddCarReview;
--GO
--CREATE PROCEDURE AddCarReview
--    @UserID INT,
--    @Client_Car_ID INT,
--    @Rating_Count FLOAT,
--    @Review_ID TEXT
--AS
--BEGIN
--    INSERT INTO RATING (User_ID, Client_Car_ID, Rating_Count, Review_ID)
--    VALUES (@UserID, @Client_Car_ID, @Rating_Count, @Review_ID);
--END;
--GO

-- 7 GetSellerDashboard
-- DROP PROCEDURE IF EXISTS GetSellerDashboard;
-- GO
--CREATE PROCEDURE GetSellerDashboard
--    @SellerID INT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT 
--        (SELECT COUNT(*) 
--         FROM CARS_ON_SALE COS
--         JOIN Client_Car CC ON COS.Client_Car_ID = CC.Client_Car_ID
--         WHERE CC.Client_ID = @SellerID) AS TotalListedCars,

--        (SELECT COUNT(*)
--         FROM TRANSACTIONS T
--         JOIN Client_Car CC ON T.Receiver_ID = CC.Client_ID
--         WHERE CC.Client_ID = @SellerID AND T.transaction_type = 'Car Purchase') AS TotalSoldCars,

--        (SELECT AVG(R.Rating_Count)
--         FROM RATING R
--         JOIN Client_Car CC ON R.Client_Car_ID = CC.Client_Car_ID
--         WHERE CC.Client_ID = @SellerID) AS SellerRating;
--END;
--GO

-- 8 GetUserDashboard
--DROP PROCEDURE IF EXISTS GetUserDashboard;
--GO
--CREATE PROCEDURE GetUserDashboard
--    @UserID INT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT 
--        (SELECT COUNT(*) FROM RATING WHERE User_ID = @UserID) AS TotalReviewsGiven,
--        (SELECT COUNT(*) FROM CAR_RENTAL_HISTORY WHERE Customer_User_ID = @UserID) AS TotalRentals;
--END;
--GO

-- 9 GetRenterDashboard
--DROP PROCEDURE IF EXISTS GetRenterDashboard;
--GO
--CREATE PROCEDURE GetRenterDashboard
--    @RenterID INT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT 
--        (SELECT COUNT(*) FROM CAR_RENTAL_HISTORY WHERE Client_Car_ID IN 
--            (SELECT Client_Car_ID FROM Client_Car WHERE Client_ID = @RenterID)) AS TotalRentals,

--        (SELECT COUNT(*) FROM CAR_RENTAL_HISTORY WHERE Client_Car_ID IN 
--            (SELECT Client_Car_ID FROM Client_Car WHERE Client_ID = @RenterID) 
--            AND Return_Date IS NOT NULL) AS TotalReturns,

--        (SELECT ISNULL(SUM(total_price),0) FROM CARS_ON_RENT CR 
--         JOIN Client_Car CC ON CR.Client_Car_ID = CC.Client_Car_ID 
--         WHERE CC.Client_ID = @RenterID) AS TotalSpent;
--END;
--GO

-- 10 GetCarPricing
-- DROP PROCEDURE IF EXISTS GetCarPricing;
-- GO
--CREATE PROCEDURE GetCarPricing
--    @Client_Car_ID INT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT Price, negotiable_price, listing_expiry
--    FROM CARS_ON_SALE
--    WHERE Client_Car_ID = @Client_Car_ID;
--END;
--GO


-- 11 BookCar
-- DROP PROCEDURE IF EXISTS BookCar;
-- GO
--CREATE PROCEDURE BookCar
--    @Client_Car_ID INT,
--    @Customer_User_ID INT,
--    @StartDate DATE,
--    @EndDate DATE,
--    @TotalPrice DECIMAL(10,2),
--    @SecurityDeposit DECIMAL(10,2)
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION;
--    IF EXISTS (SELECT 1 FROM CARS_ON_RENT WHERE Client_Car_ID = @Client_Car_ID AND status = 'Rented')
--    BEGIN
--        ROLLBACK;
--        RAISERROR ('Car is already rented!', 16, 1);
--        RETURN;
--    END

--    INSERT INTO CARS_ON_RENT (Client_Car_ID, start_date, end_date, total_price, security_deposit, status)
--    VALUES (@Client_Car_ID, @StartDate, @EndDate, @TotalPrice, @SecurityDeposit, 'Rented');

--    COMMIT;
--END;
--GO


-- 12 UpdateCarPrice
-- DROP PROCEDURE IF EXISTS UpdateCarPrice;
-- GO
--CREATE PROCEDURE UpdateCarPrice
--    @Client_Car_ID INT,
--    @NewPrice DECIMAL(10,2)
--AS
--BEGIN
--    SET NOCOUNT ON;

--    UPDATE CARS_ON_SALE
--    SET Price = @NewPrice
--    WHERE Client_Car_ID = @Client_Car_ID;
--END;
--GO


-- 13 GetCarPriceTrends
-- DROP PROCEDURE IF EXISTS GetCarPriceTrends;
-- GO
--CREATE PROCEDURE GetCarPriceTrends
--AS
--BEGIN
--    SET NOCOUNT ON;

--    SELECT CC.Client_Car_ID, M.MakeName, MO.ModelName, V.VariantName, CS.Price, CS.listed_at
--    FROM CARS_ON_SALE CS
--    JOIN Client_Car CC ON CS.Client_Car_ID = CC.Client_Car_ID
--    JOIN Car C ON CC.carID = C.CarID
--    JOIN Variant V ON C.VariantID = V.VariantID
--    JOIN Model MO ON V.ModelID = MO.ModelID
--    JOIN Make M ON MO.MakeID = M.MakeID
--    ORDER BY CS.listed_at DESC;
--END;
--GO


-- 14 AddSupportTicket
-- DROP PROCEDURE IF EXISTS AddSupportTicket;
-- GO
--CREATE PROCEDURE AddSupportTicket
--    @SenderID INT,
--    @ReceiverID INT,
--    @Message TEXT
--AS
--BEGIN
--    INSERT INTO MESSAGE (Sender_ID, Receiver_ID, Message)
--    VALUES (@SenderID, @ReceiverID, @Message);
--END;
--GO


-- 15 GetUserProfile
-- DROP PROCEDURE IF EXISTS GetUserProfile;
-- GO
--CREATE PROCEDURE GetUserProfile
--    @UserID INT
--AS
--BEGIN
--    SELECT 
--        ub.UserName,
--        ub.Name,
--        ua.Phone_Number,
--        ua.Email,
--        ub.Profile_Pic,
--        (SELECT TOP 1 CR.Client_Car_ID FROM CARS_ON_RENT CR 
--         JOIN Client_Car CC ON CR.Client_Car_ID = CC.Client_Car_ID 
--         WHERE CC.Client_ID = (SELECT Client_ID FROM CLIENT WHERE userID = @UserID) 
--         AND CR.status = 'Rented') AS BookedCarID
--    FROM UserBio ub
--    JOIN UserAuth ua ON ub.userID = ua.userID
--    WHERE ub.userID = @UserID;
--END;
--GO


-- 16 GetUserMessages
-- DROP PROCEDURE IF EXISTS GetUserMessages;
-- GO
--CREATE PROCEDURE GetUserMessages
--    @UserID INT
--AS
--BEGIN
--    SELECT Sender_ID, Receiver_ID, Message, Sent_Time
--    FROM MESSAGE
--    WHERE Sender_ID = @UserID OR Receiver_ID = @UserID
--    ORDER BY Sent_Time DESC;
--END;
--GO


-- 17 CancelBooking
-- DROP PROCEDURE IF EXISTS CancelBooking;
-- GO
--CREATE PROCEDURE CancelBooking
--    @RentalID INT
--AS
--BEGIN
--    UPDATE CARS_ON_RENT
--    SET status = 'Cancelled'
--    WHERE rental_id = @RentalID;
--END;
--GO


-- 18 ReturnCar
-- DROP PROCEDURE IF EXISTS ReturnCar;
-- GO
--CREATE PROCEDURE ReturnCar
--    @RentalID INT
--AS
--BEGIN
--    SET NOCOUNT ON;

--    BEGIN TRANSACTION;
--    DECLARE @CarID INT;

--    SELECT @CarID = carID 
--    FROM Car 
--    WHERE CarID = (SELECT carID FROM Client_Car 
--                   WHERE Client_Car_ID = (SELECT Client_Car_ID FROM CARS_ON_RENT WHERE rental_id = @RentalID));

--    IF @CarID IS NULL
--    BEGIN
--        ROLLBACK;
--        RAISERROR ('Invalid rental or already returned.', 16, 1);
--        RETURN;
--    END

--    UPDATE CARS_ON_RENT SET status = 'Returned' WHERE rental_id = @RentalID;
--    UPDATE Client_Car SET Availability = 1 WHERE Client_Car_ID = (SELECT Client_Car_ID FROM CARS_ON_RENT WHERE rental_id = @RentalID);

--    COMMIT;
--END;
--GO

-- 19 ApplyDiscount
-- DROP PROCEDURE IF EXISTS ApplyDiscount;
-- GO
--CREATE PROCEDURE ApplyDiscount
--    @RenterID INT,
--    @Discount DECIMAL(10,2)
--AS
--BEGIN
--    UPDATE Customer
--    SET wallet_balance = wallet_balance + @Discount
--    WHERE Customer_ID = @RenterID;
--END;
--GO

-- 20 AddRentingAudit
-- DROP PROCEDURE IF EXISTS AddRentingAudit;
-- GO
--CREATE PROCEDURE AddRentingAudit
--    @Client_Car_ID INT,
--    @Customer_User_ID INT,
--    @Rent_Date DATE,
--    @Return_Date DATE,
--    @Renter_Feedback TEXT = NULL
--AS
--BEGIN
--    INSERT INTO CAR_RENTAL_HISTORY (Client_Car_ID, Customer_User_ID, Rent_Date, Return_Date, renter_feedback)
--    VALUES (@Client_Car_ID, @Customer_User_ID, @Rent_Date, @Return_Date, @Renter_Feedback);
--END;
--GO

-- 21 GetCarAnalysis
-- DROP PROCEDURE IF EXISTS GetCarAnalysis;
-- GO
--CREATE PROCEDURE GetCarAnalysis
--    @CarID INT
--AS
--BEGIN
--    SELECT M.MakeName, MO.ModelName, V.VariantName, C.Color, C.Year, C.Description, CC.Condition, MO.Category, V.FuelType, V.Transmission
--    FROM Car C
--    JOIN Variant V ON C.VariantID = V.VariantID
--    JOIN Model MO ON V.ModelID = MO.ModelID
--    JOIN Make M ON MO.MakeID = M.MakeID
--    JOIN Client_Car CC ON CC.carID = C.CarID
--    WHERE C.CarID = @CarID;
--END;
--GO

-- 22 UpdateBuyerLevel
-- DROP PROCEDURE IF EXISTS UpdateBuyerLevel;
-- GO
--CREATE PROCEDURE UpdateBuyerLevel
--    @ClientID INT,
--    @TotalSpent DECIMAL(10,2)
--AS
--BEGIN
--    UPDATE Customer
--    SET total_spent = total_spent + @TotalSpent
--    WHERE Customer_ID = @ClientID;
--END;
--GO

-- 23 FilterCars_Sale
--DROP PROCEDURE IF EXISTS FilterCars_Sale;
--GO
--CREATE PROCEDURE FilterCars_Sale
--    @Brand VARCHAR(100) = NULL,
--    @MinPrice DECIMAL(10,2) = NULL,
--    @MaxPrice DECIMAL(10,2) = NULL,
--    @Transmission VARCHAR(50) = NULL
--AS
--BEGIN
--    SELECT *
--    FROM Car C
--    JOIN Variant V ON C.VariantID = V.VariantID
--    JOIN Model M ON V.ModelID = M.ModelID
--    JOIN Make MK ON M.MakeID = MK.MakeID
--    JOIN Client_Car CC ON CC.carID = C.CarID
--    JOIN CARS_ON_SALE CS ON CC.Client_Car_ID = CS.Client_Car_ID
--    WHERE
--        (@Brand IS NULL OR MK.MakeName = @Brand) AND
--        (@MinPrice IS NULL OR CS.Price >= @MinPrice) AND
--        (@MaxPrice IS NULL OR CS.Price <= @MaxPrice) AND
--        (@Transmission IS NULL OR V.Transmission = @Transmission);
--END;
--GO


-- 24 FilterCars_Rent
--DROP PROCEDURE IF EXISTS FilterCars_Rent;
--GO
--CREATE PROCEDURE FilterCars_Rent
--    @Brand VARCHAR(100) = NULL,
--    @MinPrice DECIMAL(10,2) = NULL,
--    @MaxPrice DECIMAL(10,2) = NULL,
--    @Transmission VARCHAR(50) = NULL
--AS
--BEGIN
--    SELECT *
--    FROM Car C
--    JOIN Variant V ON C.VariantID = V.VariantID
--    JOIN Model M ON V.ModelID = M.ModelID
--    JOIN Make MK ON M.MakeID = MK.MakeID
--    JOIN Client_Car CC ON CC.carID = C.CarID
--    JOIN CARS_ON_RENT CR ON CC.Client_Car_ID = CR.Client_Car_ID
--    WHERE
--        (@Brand IS NULL OR MK.MakeName = @Brand) AND
--        (@MinPrice IS NULL OR CR.total_price >= @MinPrice) AND
--        (@MaxPrice IS NULL OR CR.total_price <= @MaxPrice) AND
--        (@Transmission IS NULL OR V.Transmission = @Transmission);
--END;
--GO

-- 25 DeleteCar
--DROP PROCEDURE IF EXISTS DeleteCar;
--GO
--CREATE PROCEDURE DeleteCar
--    @CarID INT
--AS
--BEGIN
--    DELETE FROM RATING WHERE Client_Car_ID IN (
--        SELECT Client_Car_ID FROM Client_Car WHERE carID = @CarID
--    );

--    DELETE FROM CARS_ON_RENT WHERE Client_Car_ID IN (
--        SELECT Client_Car_ID FROM Client_Car WHERE carID = @CarID
--    );

--    DELETE FROM CARS_ON_SALE WHERE Client_Car_ID IN (
--        SELECT Client_Car_ID FROM Client_Car WHERE carID = @CarID
--    );

--    DELETE FROM Client_Car WHERE carID = @CarID;

--    DELETE FROM Car WHERE CarID = @CarID;
--END;
--GO


-- 26 GetCarReviews
--DROP PROCEDURE IF EXISTS GetCarReviews;
--GO
--CREATE PROCEDURE GetCarReviews
--    @Client_Car_ID INT
--AS
--BEGIN
--    SELECT UB.UserName, R.Rating_Count, R.Review_ID
--    FROM RATING R
--    JOIN UserBio UB ON R.User_ID = UB.userID
--    WHERE R.Client_Car_ID = @Client_Car_ID;
--END;
--GO


-- 27 GetRentalReport
-- DROP PROCEDURE IF EXISTS GetRentalReport;
-- GO
--CREATE PROCEDURE GetRentalReport
--AS
--BEGIN
--    SELECT 
--        (SELECT COUNT(*) FROM CARS_ON_RENT WHERE status = 'Rented') AS ActiveRentals,
--        (SELECT ISNULL(SUM(total_price), 0.00) FROM CARS_ON_RENT WHERE status = 'Returned') AS TotalRevenue;
--END;
--GO


-- 28 GetTopRatedCars
-- DROP PROCEDURE IF EXISTS GetTopRatedCars;
-- GO
--CREATE PROCEDURE GetTopRatedCars
--AS
--BEGIN
--    SELECT TOP 5
--        CC.Client_Car_ID,
--        M.MakeName,
--        MO.ModelName,
--        V.VariantName,
--        AVG(R.Rating_Count) AS AvgRating
--    FROM RATING R
--    JOIN Client_Car CC ON R.Client_Car_ID = CC.Client_Car_ID
--    JOIN Car C ON CC.carID = C.CarID
--    JOIN Variant V ON C.VariantID = V.VariantID
--    JOIN Model MO ON V.ModelID = MO.ModelID
--    JOIN Make M ON MO.MakeID = M.MakeID
--    GROUP BY CC.Client_Car_ID, M.MakeName, MO.ModelName, V.VariantName
--    ORDER BY AvgRating DESC;
--END;
--GO


-- 29 SearchCars
-- DROP PROCEDURE IF EXISTS SearchCars;
-- GO
--CREATE PROCEDURE SearchCars
--    @SearchTerm VARCHAR(100)
--AS
--BEGIN
--    SELECT DISTINCT TOP 10 M.MakeName, MO.ModelName, V.VariantName
--    FROM Make M
--    JOIN Model MO ON M.MakeID = MO.MakeID
--    JOIN Variant V ON MO.ModelID = V.ModelID
--    WHERE M.MakeName LIKE '%' + @SearchTerm + '%'
--       OR MO.ModelName LIKE '%' + @SearchTerm + '%'
--       OR V.VariantName LIKE '%' + @SearchTerm + '%';
--END;
--GO

-- 30 ResetPassword
-- DROP PROCEDURE IF EXISTS ResetPassword;
-- GO
--CREATE PROCEDURE ResetPassword
--    @Email VARCHAR(255),
--    @OldPassword NVARCHAR(255),
--    @NewPassword NVARCHAR(255)
--AS
--BEGIN
--    DECLARE @UserID INT, @StoredPassword VARBINARY(256);

--    SELECT @UserID = userID, @StoredPassword = [Password]
--    FROM UserAuth
--    WHERE LOWER(Email) = LOWER(@Email);

--    IF @UserID IS NULL
--    BEGIN
--        RAISERROR('User not found.', 16, 1);
--        RETURN;
--    END

--    IF @StoredPassword != HASHBYTES('SHA2_256', @OldPassword)
--    BEGIN
--        RAISERROR('Current password is incorrect.', 16, 1);
--        RETURN;
--    END

--    UPDATE UserAuth
--    SET
--        Previous_Password = [Password],
--        [Password] = HASHBYTES('SHA2_256', @NewPassword),
--        UpdatedAt = GETDATE()
--    WHERE userID = @UserID;
--END;
--GO

-- 31 SearchCarsWithFeatures
--DROP PROCEDURE IF EXISTS SearchCarsWithFeatures;
--GO
--CREATE PROCEDURE SearchCarsWithFeatures
--    @SearchTerm VARCHAR(100) = NULL,
--    @MinPrice DECIMAL(10,2) = NULL,
--    @MaxPrice DECIMAL(10,2) = NULL,
--    @Features VARCHAR(100) = NULL
--AS
--BEGIN
--    SELECT DISTINCT CC.Client_Car_ID, M.MakeName, MO.ModelName, V.VariantName, CS.Price
--    FROM Client_Car CC
--    JOIN Car C ON CC.carID = C.CarID
--    JOIN Variant V ON C.VariantID = V.VariantID
--    JOIN Model MO ON V.ModelID = MO.ModelID
--    JOIN Make M ON MO.MakeID = M.MakeID
--    JOIN CARS_ON_SALE CS ON CS.Client_Car_ID = CC.Client_Car_ID
--    WHERE
--        (@SearchTerm IS NULL OR M.MakeName LIKE '%' + @SearchTerm + '%' OR MO.ModelName LIKE '%' + @SearchTerm + '%') AND
--        (@MinPrice IS NULL OR CS.Price >= @MinPrice) AND
--        (@MaxPrice IS NULL OR CS.Price <= @MaxPrice) AND
--        (@Features IS NULL OR
--            V.VariantName LIKE '%' + @Features + '%' OR
--            CC.Condition LIKE '%' + @Features + '%' OR
--            V.FuelType LIKE '%' + @Features + '%' OR
--            V.Transmission LIKE '%' + @Features + '%');
--END;
--GO

-- -- 32 compareCars
-- DROP PROCEDURE IF EXISTS CompareCars;
-- GO

-- CREATE PROCEDURE CompareCars
--     @CarID1 INT,
--     @CarID2 INT
-- AS
-- BEGIN
--     SET NOCOUNT ON;
    
--     -- Get data for first car (using TOP 1 to ensure only one row)
--     SELECT TOP 1
--         C.CarID,
--         M.MakeName AS Make,
--         MO.ModelName AS Model,
--         V.VariantName AS Variant,
--         C.Year,
--         C.Color,
--         COALESCE(CS.Price, CR.total_price) AS Price,
--         CC.Condition,
--         V.FuelType,
--         V.Transmission,
--         MO.Category,
--         C.Description
--     FROM Car C
--     JOIN Variant V ON C.VariantID = V.VariantID
--     JOIN Model MO ON V.ModelID = MO.ModelID
--     JOIN Make M ON MO.MakeID = M.MakeID
--     LEFT JOIN Client_Car CC ON CC.carID = C.CarID
--     LEFT JOIN CARS_ON_SALE CS ON CS.Client_Car_ID = CC.Client_Car_ID
--     LEFT JOIN CARS_ON_RENT CR ON CR.Client_Car_ID = CC.Client_Car_ID
--     WHERE C.CarID = @CarID1
--     ORDER BY COALESCE(CS.Price, CR.total_price) DESC;  -- Prioritize non-null prices
    
--     -- Get data for second car (using TOP 1 to ensure only one row)
--     SELECT TOP 1
--         C.CarID,
--         M.MakeName AS Make,
--         MO.ModelName AS Model,
--         V.VariantName AS Variant,
--         C.Year,
--         C.Color,
--         COALESCE(CS.Price, CR.total_price) AS Price,
--         CC.Condition,
--         V.FuelType,
--         V.Transmission,
--         MO.Category,
--         C.Description
--     FROM Car C
--     JOIN Variant V ON C.VariantID = V.VariantID
--     JOIN Model MO ON V.ModelID = MO.ModelID
--     JOIN Make M ON MO.MakeID = M.MakeID
--     LEFT JOIN Client_Car CC ON CC.carID = C.CarID
--     LEFT JOIN CARS_ON_SALE CS ON CS.Client_Car_ID = CC.Client_Car_ID
--     LEFT JOIN CARS_ON_RENT CR ON CR.Client_Car_ID = CC.Client_Car_ID
--     WHERE C.CarID = @CarID2
--     ORDER BY COALESCE(CS.Price, CR.total_price) DESC;  -- Prioritize non-null prices
-- END;
-- GO

---- 1. AvailableCarsForSale
--SELECT * FROM AvailableCarsForSale;
---- Expected Result: Should show Car 1 and Car 2, as they were added to CARS_ON_SALE and their availability is 1.

---- 2. AvailableCarsForRent
-- SELECT * FROM AvailableCarsForRent;
---- Expected Result: Should show Car 3, as it was added to CARS_ON_RENT and its status is 'Available'.

---- 3. TopRatedCars
--SELECT * FROM TopRatedCars;
---- Expected Result: Should show cars with an average rating of 4.0 or higher.  Based on the inserts, Car 3 and Car 1 should appear.

---- 4. UserRentalHistory
--SELECT * FROM UserRentalHistory;
---- Expected Result: Should show the rental history for each customer.
--------------------------------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------------------------------
---- Authentication Procedures
--DROP PROCEDURE IF EXISTS SignUpUser;
--DROP PROCEDURE IF EXISTS LoginUser;
--DROP PROCEDURE IF EXISTS ResetPassword;

---- User Profile Procedures
--DROP PROCEDURE IF EXISTS UpdateProfile;
--DROP PROCEDURE IF EXISTS GetUserProfile;
--DROP PROCEDURE IF EXISTS GetUserMessages;

---- Car Management Procedures
--DROP PROCEDURE IF EXISTS AddCar;
--DROP PROCEDURE IF EXISTS AddCarForSale;
--DROP PROCEDURE IF EXISTS AddCarReview;
--DROP PROCEDURE IF EXISTS GetCarPricing;
--DROP PROCEDURE IF EXISTS UpdateCarPrice;
--DROP PROCEDURE IF EXISTS DeleteCar;
--DROP PROCEDURE IF EXISTS GetCarAnalysis;
--DROP PROCEDURE IF EXISTS GetCarReviews;

---- Rental Procedures
--DROP PROCEDURE IF EXISTS BookCar;
--DROP PROCEDURE IF EXISTS CancelBooking;
--DROP PROCEDURE IF EXISTS ReturnCar;
--DROP PROCEDURE IF EXISTS AddRentingAudit;

---- Dashboard Procedures
--DROP PROCEDURE IF EXISTS GetSellerDashboard;
--DROP PROCEDURE IF EXISTS GetUserDashboard;
--DROP PROCEDURE IF EXISTS GetRenterDashboard;
--DROP PROCEDURE IF EXISTS GetRentalReport;

---- Search & Filter Procedures
--DROP PROCEDURE IF EXISTS FilterCars;
--DROP PROCEDURE IF EXISTS FilterCars2;
--DROP PROCEDURE IF EXISTS SearchCars;
--DROP PROCEDURE IF EXISTS SearchCarsWithFeatures;
--DROP PROCEDURE IF EXISTS GetCarPriceTrends;

---- Miscellaneous Procedures
--DROP PROCEDURE IF EXISTS AddSupportTicket;
--DROP PROCEDURE IF EXISTS ApplyDiscount;
--DROP PROCEDURE IF EXISTS UpdateBuyerLevel;
--DROP PROCEDURE IF EXISTS GetTopRatedCars;
--------------------------------------------------------------------------------------------------------------------------
-- Drop tables in the correct order to avoid dependency issues
--DROP TABLE IF EXISTS CARS_ON_RENT;
--DROP TABLE IF EXISTS CARS_ON_SALE;
--DROP TABLE IF EXISTS CAR_RENTAL_HISTORY;
--DROP TABLE IF EXISTS RATING;
--DROP TABLE IF EXISTS MESSAGE;
--DROP TABLE IF EXISTS TRANSACTIONS;
--DROP TABLE IF EXISTS SELLER;
--DROP TABLE IF EXISTS RENTER;
--DROP TABLE IF EXISTS Customer;
--DROP TABLE IF EXISTS Client_Car;
--DROP TABLE IF EXISTS CLIENT;
--DROP TABLE IF EXISTS Car;
--DROP TABLE IF EXISTS Variant;
--DROP TABLE IF EXISTS VariantColor;
--DROP TABLE IF EXISTS Model;
--DROP TABLE IF EXISTS Make;
--DROP TABLE IF EXISTS UserAuth;
--DROP TABLE IF EXISTS UserBio;
--DROP TABLE IF EXISTS Users;
---------------------------------------------------------------------------------------------------------------------------

-- INSERT INTO UserBio (UserName, Name, Role, Profile_Pic, CNIC_No, Verification_Status)
-- VALUES
-- ('fallah', 'John Doe', 'Renter', 'profile_pic1.jpg', '12345-6789012-3', 'Verified'),
-- ('trail', 'Jane Smith', 'Seller', 'profile_pic2.jpg', '98765-4321098-7', 'Verified');
-- INSERT INTO UserAuth (Email, Phone_Number, Password, Last_Login, Account_Status, CreatedAt)
-- VALUES
-- ('s@l.com', '1234567822', HASHBYTES('SHA2_256', 'password123'), GETDATE(), 'Active', GETDATE()),
-- ('w@l.com', '1234567821', HASHBYTES('SHA2_256', 'password123'), GETDATE(), 'Active', GETDATE());
-- INSERT INTO CLIENT (userID) VALUES (1);
-- INSERT INTO CLIENT (userID) VALUES (2);
-- INSERT INTO SELLER (Seller_ID, total_cars_sold) VALUES (1, 10);
-- INSERT INTO RENTER (Renter_ID, total_rentals) VALUES (1, 5);
-- INSERT INTO Customer (Customer_ID, total_spent, wallet_balance) VALUES (1, 1000.00, 200.00);


-- SELECT * FROM Users;
-- SELECT * FROM UserBio;
-- SELECT * FROM UserAuth;
-- SELECT * FROM CLIENT;
-- SELECT * FROM SELLER;
-- SELECT * FROM RENTER;
-- SELECT * FROM Customer;
-- SELECT * FROM Make;
-- SELECT * FROM Model;
-- SELECT * FROM Variant;
-- SELECT * FROM VariantColor;
-- SELECT * FROM Car;
-- SELECT * FROM Client_Car;
-- SELECT * FROM CARS_ON_SALE;
-- SELECT * FROM CARS_ON_RENT;
-- SELECT * FROM CAR_RENTAL_HISTORY;
-- SELECT * FROM RATING;
-- SELECT * FROM MESSAGE;
-- SELECT * FROM TRANSACTIONS;

--33 UserInfo
-- DROP PROCEDURE IF EXISTS GetUserInfo;
-- GO
-- CREATE PROCEDURE GetUserInfo
--     @UserID INT
-- AS
-- BEGIN
--     SELECT 
--         ub.UserName,
--         ub.Name,
--         ua.Phone_Number,
--         ua.Email,
--         ub.Profile_Pic,
--         ua.Last_Login,
--         ua.Account_Status,
--         ua.CreatedAt,
--         ub.Role,
--         ub.CNIC_No,
--         ub.Verification_Status,

--         -- Role-based data
--         s.total_cars_sold,
--         s.rating,
--         r.total_rentals,
--         cu.total_spent,
--         cu.wallet_balance,

--         -- Summary info
--         (SELECT COUNT(*) 
--          FROM CARS_ON_SALE COS 
--          JOIN Client_Car CC ON COS.Client_Car_ID = CC.Client_Car_ID 
--          WHERE CC.Client_ID = (SELECT Client_ID FROM CLIENT WHERE userID = @UserID)
--         ) AS TotalListedCars,

--         (SELECT TOP 1 CR.Client_Car_ID 
--          FROM CARS_ON_RENT CR 
--          JOIN Client_Car CC ON CR.Client_Car_ID = CC.Client_Car_ID 
--          WHERE CC.Client_ID = (SELECT Client_ID FROM CLIENT WHERE userID = @UserID) 
--            AND CR.status = 'Rented'
--         ) AS BookedCarID

--     FROM Users u
--     JOIN UserBio ub ON u.userID = ub.userID
--     JOIN UserAuth ua ON u.userID = ua.userID
--     JOIN CLIENT c ON u.userID = c.userID
--     LEFT JOIN Seller s ON c.Client_ID = s.Seller_ID
--     LEFT JOIN Renter r ON c.Client_ID = r.Renter_ID
--     LEFT JOIN Customer cu ON c.Client_ID = cu.Customer_ID
--     WHERE u.userID = @UserID;
-- END;
-- GO

-- -- Test the GetUserInfo procedure
-- EXEC GetUserInfo @UserID = 22;

-- select * from Users;
-- exec SignUpUser 'fallah', 'old Doe', 'Renter', '1241567890', 'feel@hole.com', 'peiassword123';
-- exec LoginUser 'fallah', 'peiassword123';

-- exec SignUpUser 'trail', 'yaas', 'Seller', '1241567990', 'l@l.com', '111';
-- exec LoginUser 'trail', '111';


-- Make table inserts
-- INSERT INTO Make (MakeName, Country) VALUES 
-- ('Tyota', 'Japan'),
-- ('Hnda', 'Japan'),
-- ('BW', 'Germany'),
-- ('Mecedes-Benz', 'Germany'),
-- ('Frd', 'USA'),
-- ('Cevrolet', 'USA');
-- select * from Make;
-- -- Model table inserts (depends on Make)
-- INSERT INTO Model (MakeID, ModelName, Category) VALUES 
-- (1, 'Coolla', 'Sedan'),
-- (1, 'Cary', 'Sedan'),
-- (1, 'RV4', 'SUV'),
-- (2, 'ivic', 'Sedan'),
-- (2, 'C-V', 'SUV'),
-- (3, '3 Sries', 'Sedan'),
-- (7, 'C-lass', 'Sedan'),
-- (8, 'Mstang', 'Sports Car'),
-- (9, 'Caaro', 'Sports Car');

-- select * from Model;
-- -- Variant table inserts (depends on Model)
-- INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission) VALUES 
-- (1, 'LE', 'Gasoline', 'Automatic'),
-- (1, 'XLE', 'Gasoline', 'Automatic'),
-- (2, 'SE', 'Hybrid', 'Automatic'),
-- (3, 'Adventure', 'Gasoline', 'Automatic'),
-- (14, 'Sport', 'Gasoline', 'Manual'),
-- (15, 'Touring', 'Hybrid', 'Automatic'),
-- (16, '330i', 'Gasoline', 'Automatic'),
-- (17, 'AMG', 'Gasoline', 'Automatic'),
-- (18, 'GT', 'Gasoline', 'Manual');
-- select * from Variant;
-- -- VariantColor table inserts (depends on Variant)
-- INSERT INTO VariantColor (VariantID, Color) VALUES 
-- (17, 'Red'),
-- (1, 'White'),
-- (2, 'White'),
-- (2, 'Black'),
-- (14, 'Silver'),
-- (14, 'Green'),
-- (15, 'Black'),
-- (16, 'White'),
-- (17, 'Blue'),
-- (18, 'Silver'),
-- (17, 'Yellow');
-- select * from VariantColor;
-- -- Car table inserts (depends on Variant)
-- INSERT INTO Car (VariantID, Color, Year, Description) VALUES 
-- (1, 'Red', 2022, 'Toyota Corolla LE in excellent condition with low mileage.'),
-- (2, 'White', 2023, 'Toyota Corolla XLE with premium features and sunroof.'),
-- (3, 'Silver', 2021, 'Toyota Camry SE Hybrid with leather seats and navigation.'),
-- (14, 'Green', 2022, 'Toyota RAV4 Adventure with all-wheel drive and roof rack.'),
-- (15, 'Black', 2023, 'Honda Civic Sport with manual transmission for enthusiasts.'),
-- (16, 'White', 2022, 'Honda CR-V Touring Hybrid with premium features.'),
-- (17, 'Blue', 2023, 'BMW 330i with premium sound system and navigation.'),
-- (1, 'Silver', 2022, 'Mercedes-Benz C-Class AMG with performance package.'),
-- (3, 'Yellow', 2021, 'Ford Mustang GT with performance package and premium audio.');
-- select * from Car;
-- select * from Client;
-- -- Client_Car table inserts (depends on Car and CLIENT)
-- -- Assuming CLIENT table has IDs 1, 2, and 3
-- INSERT INTO Client_Car (VIN, carID, Client_ID, Condition, Location) VALUES 
-- ('JT2BF22K1X0123456', 14, 1, '9', 'Islamabad'),
-- ('1HGCM82633A123456', 2, 1, '8', 'Lahore'),
-- ('WBAAL31029P123456', 3, 2, '10', 'Karachi'),
-- ('WDDGF4HB5EA123456', 4, 2, '9', 'Peshawar'),
-- ('1FATP8UH3K5123456', 5, 3, '7', 'Quetta'),
-- ('1G1FB3DX7L0123456', 16, 3, '8', 'Islamabad');
-- select * from Client_Car;
-- -- CARS_ON_SALE table inserts (depends on Client_Car)
-- INSERT INTO CARS_ON_SALE (Client_Car_ID, [State], Price, negotiable_price) VALUES 
-- (2, 'USED', 22000.00, 1),
-- (3, 'NEW', 45000.00, 0),
-- (5, 'USED', 38000.00, 1);

-- -- CARS_ON_RENT table inserts (depends on Client_Car)
-- INSERT INTO CARS_ON_RENT (Client_Car_ID, [start_date], end_date, total_price, security_deposit, [status]) VALUES 
-- (2, '2025-06-01', '2025-06-07', 3500.00, 1000.00, 'Available'),
-- (4, '2025-06-10', '2025-06-20', 5800.00, 1500.00, 'Available'),
-- (6, '2025-06-05', '2025-06-12', 4200.00, 1200.00, 'Available');

use Car_Rental_System_try
go
EXEC CompareCars @CarID1 = 1, @CarID2 = 3;