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
--   [Role] VARCHAR(20) CHECK ([Role] IN ('Seller', 'Renter', 'Customer','Admin')) NOT NULL,
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


 --CREATE TABLE CLIENT 
 --(
 --  Client_ID INT NOT NULL UNIQUE,
	-- userID INT NOT NULL UNIQUE,
 --  FOREIGN KEY (Client_ID) REFERENCES Users(userID) ON DELETE NO ACTION,
 --   FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE NO ACTION,
 --);

  
 --CREATE TABLE SELLER 
 --(
 --  Seller_ID INT PRIMARY KEY,
 --  total_cars_sold INT DEFAULT 0,
 --  rating FLOAT DEFAULT 0.0 CHECK (rating BETWEEN 0.0 AND 5.0),
 --  verification_status BIT DEFAULT 0,
 --  FOREIGN KEY (Seller_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
 --);

 --CREATE TABLE RENTER 
 --(
 --  Renter_ID INT PRIMARY KEY,
 --  total_rentals INT DEFAULT 0,
 --  FOREIGN KEY (Renter_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
 --);

--CREATE TABLE Customer 
--(
--   Customer_ID INT PRIMARY KEY,
--   total_cars_purchased INT DEFAULT 0,
--   total_spent DECIMAL(10,2) DEFAULT 0.0,
--   wallet_balance DECIMAL(10,2) DEFAULT 0.0,
--   FOREIGN KEY (Customer_ID) REFERENCES Users(userID) ON DELETE CASCADE
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

 --CREATE TABLE Client_Car -- Car Listings
 --(
 --   Client_Car_ID INT unique Not NULL,
 --   VIN VARCHAR(17) UNIQUE NOT NULL,
 --   Client_ID INT NOT NULL,
 --   carID INT NOT NULL,
 --   Condition VARCHAR(10) CHECK (Condition IN ('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')),
 --   [Location] VARCHAR(255),
 --   [Availability] BIT DEFAULT 1,  
 --   FOREIGN KEY (Client_Car_id) REFERENCES Car(CarID) ON DELETE NO ACTION,
 --   FOREIGN KEY (carID) REFERENCES Car(CarID) ON DELETE NO ACTION,
 --   FOREIGN KEY (Client_ID) REFERENCES CLIENT(Client_ID) ON DELETE NO ACTION
 --);

--drop table Client_Car

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
--    security_deposit DECIMAL(10,2) DEFAULT 1000.0,
--    [status] VARCHAR(20) CHECK ([status] IN ('Available', 'Rented', 'Returned','Cancelled')),
--    rented_at DATETIME DEFAULT GETDATE(),
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
--   Car_id INT NOT NULL,
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
--   FOREIGN KEY (Receiver_ID) REFERENCES Users(userID) ON DELETE NO ACTION,
--  FOREIGN KEY (Car_id) REFERENCES Client_Car(Client_Car_ID) ON DELETE NO ACTION
--);
--------------------------------------------------------------------------------------------------------------------------------------------------------------
---- Views

--GO  -- Remove GO statements, not needed inside an immersive

 -- View: Available Cars For Sale
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

-- --View: User Rental History
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

--GO
--CREATE VIEW View_Cars_On_Sale_UniqueVIN AS
--WITH VIN_Ranked AS (
--    SELECT
--        cos.Client_Car_ID,
--        cc.VIN,
--        ROW_NUMBER() OVER (
--            PARTITION BY cc.VIN
--            ORDER BY cos.listed_at DESC -- you can change this ordering if needed
--        ) AS rn
--    FROM CARS_ON_SALE cos
--    INNER JOIN Client_Car cc ON cc.Client_Car_ID = cos.Client_Car_ID
--)
--SELECT
--    -- CARS_ON_SALE
--    cos.Sale_Cars_ID,
--    cos.Client_Car_ID,
--    cos.[State],
--    cos.Price,
--    cos.negotiable_price,
--    cos.listed_at,
--    cos.listing_expiry,

--    -- CLIENT_CAR
--    cc.VIN,
--    cc.Condition,
--    cc.[Location],
--    cc.[Availability],

--    -- CAR
--    c.CarID,
--    c.VariantID,
--    c.Color AS CarColor,
--    c.Year,
--    c.Description,

--    -- VARIANT
--    v.VariantName,
--    v.FuelType,
--    v.Transmission,

--    -- VARIANTCOLOR
--    vc.Color AS VariantColor,

--    -- MODEL
--    m.ModelID,
--    m.ModelName,
--    m.Category,

--    -- MAKE
--    mk.MakeID,
--    mk.MakeName,
--    mk.Country,

--    -- CLIENT
--    cl.Client_ID,

--    -- USER BIO & AUTH
--    ub.Profile_Pic,
--    ub.UserName,
--    ua.Phone_Number,

--    -- RATING
--    r.Rating_ID,
--    r.Rating_Count,
--    r.Review_ID,

--    -- RENTAL HISTORY
--    crh.history_id,
--    crh.Rent_Date,
--    crh.Return_Date,
--    crh.renter_feedback

--FROM VIN_Ranked vr
--JOIN CARS_ON_SALE cos ON cos.Client_Car_ID = vr.Client_Car_ID
--JOIN Client_Car cc ON cc.Client_Car_ID = cos.Client_Car_ID
--JOIN Car c ON c.CarID = cc.carID
--JOIN Variant v ON v.VariantID = c.VariantID
--LEFT JOIN VariantColor vc ON vc.VariantID = v.VariantID AND vc.Color = c.Color
--JOIN Model m ON m.ModelID = v.ModelID
--JOIN Make mk ON mk.MakeID = m.MakeID
--JOIN CLIENT cl ON cl.Client_ID = cc.Client_ID
--JOIN Users u ON u.userID = cl.userID
--JOIN UserBio ub ON ub.userID = u.userID
--JOIN UserAuth ua ON ua.userID = u.userID
--LEFT JOIN RATING r ON r.Client_Car_ID = cc.Client_Car_ID
--LEFT JOIN CAR_RENTAL_HISTORY crh ON crh.Client_Car_ID = cc.Client_Car_ID
--WHERE vr.rn = 1;

--GO

--GO
--CREATE VIEW View_Cars_On_Rent_UniqueVIN AS
--WITH VIN_Ranked AS (
--    SELECT
--        cor.Client_Car_ID,
--        cc.VIN,
--        ROW_NUMBER() OVER (
--            PARTITION BY cc.VIN
--            ORDER BY cor.rented_at DESC
--        ) AS rn
--    FROM CARS_ON_RENT cor
--    INNER JOIN Client_Car cc ON cc.Client_Car_ID = cor.Client_Car_ID
--)
--SELECT
--    -- CARS_ON_RENT
--    cor.rental_id,
--    cor.Client_Car_ID,
--    cor.start_date,
--    cor.end_date,
--    cor.total_price,
--    cor.security_deposit,
--    cor.status,
--    cor.rented_at,
--    cor.extension_requested,

--    -- CLIENT_CAR
--    cc.VIN,
--    cc.Condition,
--    cc.Location,
--    cc.Availability,

--    -- CAR
--    c.CarID,
--    c.VariantID,
--    c.Color AS CarColor,
--    c.Year,
--    c.Description,

--    -- VARIANT
--    v.VariantName,
--    v.FuelType,
--    v.Transmission,

--    -- VARIANTCOLOR
--    vc.Color AS VariantColor,

--    -- MODEL
--    m.ModelID,
--    m.ModelName,
--    m.Category,

--    -- MAKE
--    mk.MakeID,
--    mk.MakeName,
--    mk.Country,

--    -- CLIENT & USER INFO
--    cl.Client_ID,
--    u.userID,
--    ub.Profile_Pic,
--    ub.UserName,
--    ua.Phone_Number,

--    -- RATING
--    r.Rating_ID,
--    r.Rating_Count,
--    r.Review_ID,

--    -- RENTAL HISTORY
--    crh.history_id,
--    crh.Rent_Date,
--    crh.Return_Date,
--    crh.renter_feedback

--FROM VIN_Ranked vr
--JOIN CARS_ON_RENT cor ON cor.Client_Car_ID = vr.Client_Car_ID
--JOIN Client_Car cc ON cc.Client_Car_ID = cor.Client_Car_ID
--JOIN Car c ON c.CarID = cc.carID
--JOIN Variant v ON v.VariantID = c.VariantID
--LEFT JOIN VariantColor vc ON vc.VariantID = v.VariantID AND vc.Color = c.Color
--JOIN Model m ON m.ModelID = v.ModelID
--JOIN Make mk ON mk.MakeID = m.MakeID
--JOIN CLIENT cl ON cl.Client_ID = cc.Client_ID
--JOIN Users u ON u.userID = cl.userID
--JOIN UserBio ub ON ub.userID = u.userID
--JOIN UserAuth ua ON ua.userID = u.userID
--LEFT JOIN RATING r ON r.Client_Car_ID = cc.Client_Car_ID
--LEFT JOIN CAR_RENTAL_HISTORY crh ON crh.Client_Car_ID = cc.Client_Car_ID
--WHERE vr.rn = 1;
select * from Purchased_cars
--CREATE VIEW Purchased_cars AS
--SELECT 
--    t.transaction_id,
--    t.Sender_ID AS Buyer_ID,
--    ub.UserName AS Buyer_Name,
--    t.Receiver_ID AS Seller_ID,
--    seller_ub.UserName AS Seller_Name,
--    t.amount AS Purchase_Price,
--    t.transaction_date AS Purchase_Date,
--    t.payment_method,
--    t.status AS Transaction_Status,
--    cc.Client_Car_ID,
--    cc.VIN,
--    c.CarID,
--    v.VariantName,
--    m.ModelName,
--    mk.MakeName,
--    c.Color,
--    c.Year,
--    cc.Condition AS Car_Condition,
--    cc.Location
--FROM 
--    TRANSACTIONS t
--    INNER JOIN Client_Car cc ON cc.Client_Car_ID = t.Reference_ID
--    INNER JOIN Car c ON c.CarID = cc.carID
--    INNER JOIN Variant v ON v.VariantID = c.VariantID
--    INNER JOIN Model m ON m.ModelID = v.ModelID
--    INNER JOIN Make mk ON mk.MakeID = m.MakeID
--    LEFT JOIN Users buyer ON buyer.userID = t.Sender_ID
--    LEFT JOIN Users seller ON seller.userID = t.Receiver_ID
--    LEFT JOIN UserBio ub ON ub.userID = buyer.userID
--    LEFT JOIN UserBio seller_ub ON seller_ub.userID = seller.userID
--WHERE 
--    t.transaction_type = 'Car Purchase'
--    AND t.status = 'Completed';
--GO




--PROCEDURES
--------------------------------------------------------------------------------------------------------------------------------------------------------------
 --1 SignUpUser
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


--        IF @Role = 'Seller'
--		BEGIN
--		        INSERT INTO CLIENT(Client_ID,userID) VALUES(@UserID,@UserID);
--				INSERT INTO SELLER(Seller_ID) SELECT Client_ID FROM CLIENT WHERE userID = @UserID;

--		END
--        ELSE IF @Role = 'Renter'
--		BEGIN
--		        INSERT INTO CLIENT(Client_ID,userID) VALUES(@UserID,@UserID);
--				INSERT INTO RENTER(Renter_ID) SELECT Client_ID FROM CLIENT WHERE userID = @UserID;
--		END
--        ELSE IF @Role = 'Customer'
--		BEGIN
--            INSERT INTO Customer(Customer_ID) SELECT userID FROM Users WHERE userID = @UserID;
--		END
		
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


---- 4 AddCar (LATER)
--USE Car_Rental_System_try
--GO

---- Drop the procedure if it exists
--DROP PROCEDURE IF EXISTS AddCar;
--GO

--CREATE PROCEDURE AddCar
--    @MakeName VARCHAR(100),
--    @Country VARCHAR(100) = 'Unknown',
--    @ModelName VARCHAR(100),
--    @Category VARCHAR(100) = NULL,
--    @VariantName VARCHAR(100),
--    @FuelType VARCHAR(50) = NULL,
--    @Transmission VARCHAR(50) = NULL,
--    @Color VARCHAR(50),
--    @Year INT,
--    @Description TEXT
--AS
--BEGIN
--    SET NOCOUNT ON;
    
--    BEGIN TRY
--        BEGIN TRANSACTION;
        
--        DECLARE @MakeID INT, @ModelID INT, @VariantID INT, @CarID INT;
        
--        -- Check if Make exists, otherwise create it
--        SELECT @MakeID = MakeID FROM Make WHERE MakeName = @MakeName;
        
--        IF @MakeID IS NULL
--        BEGIN
--            INSERT INTO Make (MakeName, Country)
--            VALUES (@MakeName, @Country);
            
--            SET @MakeID = SCOPE_IDENTITY();
--        END;
        
--        -- Check if Model exists, otherwise create it
--        SELECT @ModelID = ModelID 
--        FROM Model 
--        WHERE MakeID = @MakeID AND ModelName = @ModelName;
        
--        IF @ModelID IS NULL
--        BEGIN
--            INSERT INTO Model (MakeID, ModelName, Category)
--            VALUES (@MakeID, @ModelName, @Category);
            
--            SET @ModelID = SCOPE_IDENTITY();
--        END;
        
--        -- Check if Variant exists, otherwise create it
--        SELECT @VariantID = VariantID 
--        FROM Variant 
--        WHERE ModelID = @ModelID AND VariantName = @VariantName;
        
--        IF @VariantID IS NULL
--        BEGIN
--            INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission)
--            VALUES (@ModelID, @VariantName, @FuelType, @Transmission);
            
--            SET @VariantID = SCOPE_IDENTITY();
--        END;
        
--        -- Insert the car record
--        INSERT INTO Car (VariantID, Color, Year, Description)
--        VALUES (@VariantID, @Color, @Year, @Description);
        
--        SET @CarID = SCOPE_IDENTITY();
        
--        -- Return the car-related IDs
--        SELECT 
--            @MakeID AS MakeID,
--            @ModelID AS ModelID, 
--            @VariantID AS VariantID,
--            @CarID AS CarID;
       
--        COMMIT TRANSACTION;
--    END TRY
--    BEGIN CATCH
--        IF @@TRANCOUNT > 0
--            ROLLBACK TRANSACTION;
            
--        -- Return error information
--        SELECT 
--            ERROR_NUMBER() AS ErrorNumber,
--            ERROR_SEVERITY() AS ErrorSeverity,
--            ERROR_STATE() AS ErrorState,
--            ERROR_PROCEDURE() AS ErrorProcedure,
--            ERROR_LINE() AS ErrorLine,
--            ERROR_MESSAGE() AS ErrorMessage;
--    END CATCH
--END
--GO



-- DROP PROCEDURE IF EXISTS AddCarForRent;
-- GO

-- CREATE PROCEDURE AddCarForRent (LATER)
--    @carID INT,
--    @Client_ID INT,
--    @VIN VARCHAR(17),
--    @Condition VARCHAR(10),
--    @Location VARCHAR(255),
--    @start_date DATE,
--    @end_date DATE,
--    @total_price DECIMAL(10,2),
--    @security_deposit DECIMAL(10,2) = 0.00
-- AS
-- BEGIN
--    SET NOCOUNT ON;
   
--    BEGIN TRY
--        BEGIN TRANSACTION;
       
--        DECLARE @ClientCarID INT;

--        -- First create the Client_Car entry
--        INSERT INTO Client_Car (VIN, carID, Client_ID, Condition, Location)
--        VALUES (@VIN, @carID, @Client_ID, @Condition, @Location);
       
--        SET @ClientCarID = SCOPE_IDENTITY();
       
--        -- Then create the CARS_ON_RENT entry
--        INSERT INTO CARS_ON_RENT 
--            (Client_Car_ID, [start_date], end_date, total_price, security_deposit, [status])
--        VALUES 
--            (@ClientCarID, @start_date, @end_date, @total_price, @security_deposit, 'Available');
           
--        COMMIT TRANSACTION;
--    END TRY
--    BEGIN CATCH
--        IF @@TRANCOUNT > 0
--            ROLLBACK TRANSACTION;
--    END CATCH
-- END;
-- GO

-- --6 AddCarReview
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

    
  



 ---- 32 compareCars
 --DROP PROCEDURE IF EXISTS CompareCars;
 --GO

 --CREATE PROCEDURE CompareCars
 --    @CarID1 INT,
 --    @CarID2 INT
 --AS
 --BEGIN
 --    SET NOCOUNT ON;
    
 --    -- Get data for first car (using TOP 1 to ensure only one row)
 --    SELECT TOP 1
 --        C.CarID,
 --        M.MakeName AS Make,
 --        MO.ModelName AS Model,
 --        V.VariantName AS Variant,
 --        C.Year,
 --        C.Color,
 --        COALESCE(CS.Price, CR.total_price) AS Price,
 --        CC.Condition,
 --        V.FuelType,
 --        V.Transmission,
 --        MO.Category,
 --        C.Description
 --    FROM Car C
 --    JOIN Variant V ON C.VariantID = V.VariantID
 --    JOIN Model MO ON V.ModelID = MO.ModelID
 --    JOIN Make M ON MO.MakeID = M.MakeID
 --    LEFT JOIN Client_Car CC ON CC.carID = C.CarID
 --    LEFT JOIN CARS_ON_SALE CS ON CS.Client_Car_ID = CC.Client_Car_ID
 --    LEFT JOIN CARS_ON_RENT CR ON CR.Client_Car_ID = CC.Client_Car_ID
 --    WHERE C.CarID = @CarID1
 --    ORDER BY COALESCE(CS.Price, CR.total_price) DESC;  -- Prioritize non-null prices
    
 --    -- Get data for second car (using TOP 1 to ensure only one row)
 --    SELECT TOP 1
 --        C.CarID,
 --        M.MakeName AS Make,
 --        MO.ModelName AS Model,
 --        V.VariantName AS Variant,
 --        C.Year,
 --        C.Color,
 --        COALESCE(CS.Price, CR.total_price) AS Price,
 --        CC.Condition,
 --        V.FuelType,
 --        V.Transmission,
 --        MO.Category,
 --        C.Description
 --    FROM Car C
 --    JOIN Variant V ON C.VariantID = V.VariantID
 --    JOIN Model MO ON V.ModelID = MO.ModelID
 --    JOIN Make M ON MO.MakeID = M.MakeID
 --    LEFT JOIN Client_Car CC ON CC.carID = C.CarID
 --    LEFT JOIN CARS_ON_SALE CS ON CS.Client_Car_ID = CC.Client_Car_ID
 --    LEFT JOIN CARS_ON_RENT CR ON CR.Client_Car_ID = CC.Client_Car_ID
 --    WHERE C.CarID = @CarID2
 --    ORDER BY COALESCE(CS.Price, CR.total_price) DESC;  -- Prioritize non-null prices
 --END;
 --GO

 --33 UserInfo
 --DROP PROCEDURE IF EXISTS GetUserInfo;
 --GO
 --CREATE PROCEDURE GetUserInfo
 --    @UserID INT
 --AS
 --BEGIN
 --    SELECT 
 --        ub.UserName,
 --        ub.Name,
 --        ua.Phone_Number,
 --        ua.Email,
 --        ub.Profile_Pic,
 --        ua.Last_Login,
 --        ua.Account_Status,
 --        ua.CreatedAt,
 --        ub.Role,
 --        ub.CNIC_No,
 --        ub.Verification_Status,

 --        -- Role-based data
 --        s.total_cars_sold,
 --        s.rating,
 --        r.total_rentals,
 --        cu.total_spent,
 --        cu.wallet_balance,

 --        -- Summary info
 --        (SELECT COUNT(*) 
 --         FROM CARS_ON_SALE COS 
 --         JOIN Client_Car CC ON COS.Client_Car_ID = CC.Client_Car_ID 
 --         WHERE CC.Client_ID = (SELECT Client_ID FROM CLIENT WHERE userID = @UserID)
 --        ) AS TotalListedCars,

 --        (SELECT TOP 1 CR.Client_Car_ID 
 --         FROM CARS_ON_RENT CR 
 --         JOIN Client_Car CC ON CR.Client_Car_ID = CC.Client_Car_ID 
 --         WHERE CC.Client_ID = (SELECT Client_ID FROM CLIENT WHERE userID = @UserID) 
 --           AND CR.status = 'Rented'
 --        ) AS BookedCarID

 --    FROM Users u
 --    JOIN UserBio ub ON u.userID = ub.userID
 --    JOIN UserAuth ua ON u.userID = ua.userID
 --    JOIN CLIENT c ON u.userID = c.userID
 --    LEFT JOIN Seller s ON c.Client_ID = s.Seller_ID
 --    LEFT JOIN Renter r ON c.Client_ID = r.Renter_ID
 --    LEFT JOIN Customer cu ON c.Client_ID = cu.Customer_ID
 --    WHERE u.userID = @UserID;
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

--GO
--CREATE VIEW View_Cars_On_Rent_UniqueVIN AS
--WITH VIN_Ranked AS (
--    SELECT
--        cor.Client_Car_ID,
--        cc.VIN,
--        ROW_NUMBER() OVER (
--            PARTITION BY cc.VIN
--            ORDER BY cor.rented_at DESC
--        ) AS rn
--    FROM CARS_ON_RENT cor
--    INNER JOIN Client_Car cc ON cc.Client_Car_ID = cor.Client_Car_ID
--)
--SELECT
--    -- CARS_ON_RENT
--    cor.rental_id,
--    cor.Client_Car_ID,
--    cor.start_date,
--    cor.end_date,
--    cor.total_price,
--    cor.security_deposit,
--    cor.status,
--    cor.rented_at,

--    -- CLIENT_CAR
--    cc.VIN,
--    cc.Condition,
--    cc.Location,
--    cc.Availability,

--    -- CAR
--    c.CarID,
--    c.VariantID,
--    c.Color AS CarColor,
--    c.Year,
--    c.Description,

--    -- VARIANT
--    v.VariantName,
--    v.FuelType,
--    v.Transmission,

--    -- VARIANTCOLOR
--    vc.Color AS VariantColor,

--    -- MODEL
--    m.ModelID,
--    m.ModelName,
--    m.Category,

--    -- MAKE
--    mk.MakeID,
--    mk.MakeName,
--    mk.Country,

--    -- CLIENT & USER INFO
--    cl.Client_ID,
--    u.userID,
--    ub.Profile_Pic,
--    ub.UserName,
--    ua.Phone_Number,

--    -- RATING
--    r.Rating_ID,
--    r.Rating_Count,
--    r.Review_ID,

--    -- RENTAL HISTORY
--    crh.history_id,
--    crh.Rent_Date,
--    crh.Return_Date,
--    crh.renter_feedback

--FROM VIN_Ranked vr
--JOIN CARS_ON_RENT cor ON cor.Client_Car_ID = vr.Client_Car_ID
--JOIN Client_Car cc ON cc.Client_Car_ID = cor.Client_Car_ID
--JOIN Car c ON c.CarID = cc.carID
--JOIN Variant v ON v.VariantID = c.VariantID
--LEFT JOIN VariantColor vc ON vc.VariantID = v.VariantID AND vc.Color = c.Color
--JOIN Model m ON m.ModelID = v.ModelID
--JOIN Make mk ON mk.MakeID = m.MakeID
--JOIN CLIENT cl ON cl.Client_ID = cc.Client_ID
--JOIN Users u ON u.userID = cl.userID
--JOIN UserBio ub ON ub.userID = u.userID
--JOIN UserAuth ua ON ua.userID = u.userID
--LEFT JOIN RATING r ON r.Client_Car_ID = cc.Client_Car_ID
--LEFT JOIN CAR_RENTAL_HISTORY crh ON crh.Client_Car_ID = cc.Client_Car_ID
--WHERE vr.rn = 1;



--DROP PROCEDURE IF EXISTS SearchCarsWithFeatures;
--GO

--CREATE PROCEDURE SearchCarsWithFeatures
--    @SearchTerm VARCHAR(100) = NULL,
--    @MinPrice DECIMAL(10,2) = NULL,
--    @MaxPrice DECIMAL(10,2) = NULL,
--    @Features VARCHAR(100) = NULL,
--    @ShowRentals BIT = 1,
--    @ShowSales BIT = 1
--AS
--BEGIN
--    SET NOCOUNT ON;
    
--    -- Create a temporary table with VARCHAR(MAX) instead of TEXT
--    CREATE TABLE #MatchingCars (
--        CarID INT,
--        MakeName VARCHAR(100),
--        ModelName VARCHAR(100),
--        VariantName VARCHAR(100),
--        Year INT,
--        Color VARCHAR(50),
--        Price DECIMAL(10,2),
--        Transmission VARCHAR(50),
--        FuelType VARCHAR(50),
--        Condition VARCHAR(10),
--        Description VARCHAR(MAX), -- Changed from TEXT to VARCHAR(MAX)
--        ListingType VARCHAR(10),
--        Availability BIT
--    );
    
--    -- Insert cars from CARS_ON_SALE (removed DISTINCT)
--    IF @ShowSales = 1
--    BEGIN
--        INSERT INTO #MatchingCars
--        SELECT 
--            C.CarID,
--            M.MakeName,
--            MO.ModelName,
--            V.VariantName,
--            C.Year,
--            C.Color,
--            CS.Price,
--            V.Transmission,
--            V.FuelType,
--            CC.Condition,
--            CAST(C.Description AS VARCHAR(MAX)), -- Cast to VARCHAR(MAX)
--            'Sale' AS ListingType,
--            CC.Availability
--        FROM Car C
--        JOIN Variant V ON C.VariantID = V.VariantID
--        JOIN Model MO ON V.ModelID = MO.ModelID
--        JOIN Make M ON MO.MakeID = M.MakeID
--        JOIN Client_Car CC ON CC.carID = C.CarID
--        JOIN CARS_ON_SALE CS ON CS.Client_Car_ID = CC.Client_Car_ID
--        WHERE
--            (@SearchTerm IS NULL OR 
--                M.MakeName LIKE '%' + @SearchTerm + '%' OR 
--                MO.ModelName LIKE '%' + @SearchTerm + '%' OR
--                V.VariantName LIKE '%' + @SearchTerm + '%' OR
--                C.Color LIKE '%' + @SearchTerm + '%') AND
--            (@MinPrice IS NULL OR CS.Price >= @MinPrice) AND
--            (@MaxPrice IS NULL OR CS.Price <= @MaxPrice) AND
--            (@Features IS NULL OR
--                V.VariantName LIKE '%' + @Features + '%' OR
--                CC.Condition LIKE '%' + @Features + '%' OR
--                V.FuelType LIKE '%' + @Features + '%' OR
--                V.Transmission LIKE '%' + @Features + '%' OR
--                MO.Category LIKE '%' + @Features + '%');
--    END;
    
--    -- Insert cars from CARS_ON_RENT (removed DISTINCT)
--    IF @ShowRentals = 1
--    BEGIN
--        INSERT INTO #MatchingCars
--        SELECT 
--            C.CarID,
--            M.MakeName,
--            MO.ModelName,
--            V.VariantName,
--            C.Year,
--            C.Color,
--            CR.total_price,
--            V.Transmission,
--            V.FuelType,
--            CC.Condition,
--            CAST(C.Description AS VARCHAR(MAX)), -- Cast to VARCHAR(MAX)
--            'Rental' AS ListingType,
--            CASE WHEN CR.[status] = 'Available' THEN 1 ELSE 0 END AS Availability
--        FROM Car C
--        JOIN Variant V ON C.VariantID = V.VariantID
--        JOIN Model MO ON V.ModelID = MO.ModelID
--        JOIN Make M ON MO.MakeID = M.MakeID
--        JOIN Client_Car CC ON CC.carID = C.CarID
--        JOIN CARS_ON_RENT CR ON CR.Client_Car_ID = CC.Client_Car_ID
--        WHERE
--            (@SearchTerm IS NULL OR 
--                M.MakeName LIKE '%' + @SearchTerm + '%' OR 
--                MO.ModelName LIKE '%' + @SearchTerm + '%' OR
--                V.VariantName LIKE '%' + @SearchTerm + '%' OR
--                C.Color LIKE '%' + @SearchTerm + '%') AND
--            (@MinPrice IS NULL OR CR.total_price >= @MinPrice) AND
--            (@MaxPrice IS NULL OR CR.total_price <= @MaxPrice) AND
--            (@Features IS NULL OR
--                V.VariantName LIKE '%' + @Features + '%' OR
--                CC.Condition LIKE '%' + @Features + '%' OR
--                V.FuelType LIKE '%' + @Features + '%' OR
--                V.Transmission LIKE '%' + @Features + '%' OR
--                MO.Category LIKE '%' + @Features + '%');
--    END;
    
--    -- Use a GROUP BY to handle duplicate rows instead of DISTINCT
--    SELECT 
--        CarID,
--        MakeName,
--        ModelName,
--        VariantName,
--        Year,
--        Color,
--        Price,
--        Transmission,
--        FuelType,
--        Condition,
--        Description,
--        ListingType,
--        Availability
--    FROM #MatchingCars
--    GROUP BY 
--        CarID,
--        MakeName,
--        ModelName,
--        VariantName,
--        Year,
--        Color,
--        Price,
--        Transmission,
--        FuelType,
--        Condition,
--        Description,
--        ListingType,
--        Availability
--    ORDER BY MakeName, ModelName, VariantName;
    
--    -- Clean up
--    DROP TABLE #MatchingCars;
--END;
--GO



---------------------------------------------------------------------------------------------------------------------------
---- Insert Make data
--INSERT INTO Make (MakeName, Country) VALUES
--('Honda', 'Japan'),
--('Toyota', 'Japan'),
--('BMW', 'Germany'),
--('Mercedes-Benz', 'Germany'),
--('Ford', 'USA');

---- Insert Model data
--INSERT INTO Model (MakeID, ModelName, Category) VALUES
--(1, 'Civic', 'Sedan'),
--(1, 'City', 'Sedan'),
--(2, 'Corolla', 'Sedan'),
--(2, 'Fortuner', 'SUV'),
--(3, 'X5', 'SUV'),
--(4, 'C-Class', 'Sedan'),
--(5, 'Mustang', 'Sports Car');

---- Insert Variant data
--INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission) VALUES
--(1, 'EX', 'Petrol', 'Automatic'),
--(1, 'RS', 'Petrol', 'Manual'),
--(2, 'Aspire', 'Petrol', 'Automatic'),
--(3, 'GLi', 'Petrol', 'Manual'),
--(3, 'Altis', 'Petrol', 'Automatic'),
--(4, 'V6', 'Diesel', 'Automatic'),
--(5, 'xDrive40i', 'Petrol', 'Automatic');

---- Insert VariantColor data
--INSERT INTO VariantColor (VariantID, Color) VALUES
--(1, 'Red'),
--(1, 'White'),
--(1, 'Black'),
--(2, 'Blue'),
--(2, 'Silver'),
--(3, 'White'),
--(3, 'Black'),
--(4, 'Silver'),
--(5, 'White');

---- Insert Car data
--INSERT INTO Car (VariantID, Color, Year, Description) VALUES
--(1, 'Red', 2022, 'Honda Civic EX with premium features'),
--(2, 'Blue', 2021, 'Honda Civic RS with manual transmission'),
--(3, 'White', 2023, 'Brand new Honda City Aspire'),
--(4, 'Silver', 2020, 'Toyota Corolla GLi in excellent condition'),
--(5, 'White', 2022, 'Toyota Corolla Altis with premium package');

---- Insert Client_Car data (linked to Seller with ID 7)
--INSERT INTO Client_Car (Client_Car_ID, VIN, Client_ID, carID, Condition, Location, Availability) VALUES
--(1, 'JH4DA9380NS000001', 7, 1, '9', 'Islamabad', 1),
--(2, 'JH4DA9380NS000002', 7, 2, '8', 'Rawalpindi', 1),
--(3, 'JH4DA9380NS000003', 7, 3, '10', 'Islamabad', 1),
--(4, 'JH4DA9380NS000004', 7, 4, '7', 'Lahore', 1),
--(5, 'JH4DA9380NS000005', 7, 5, '9', 'Karachi', 1);

---- Insert CARS_ON_SALE data
--INSERT INTO CARS_ON_SALE (Client_Car_ID, State, Price, negotiable_price) VALUES
--(1, 'NEW', 5000000.00, 1),
--(2, 'USED', 4500000.00, 1),
--(3, 'NEW', 5500000.00, 0);

---- Insert CARS_ON_RENT data
--INSERT INTO CARS_ON_RENT (Client_Car_ID, start_date, end_date, total_price, security_deposit, status) VALUES
--(4, '2024-03-01', '2024-03-15', 75000.00, 50000.00, 'Available'),
--(5, '2024-03-10', '2024-03-25', 65000.00, 50000.00, 'Available');

---- Insert CAR_RENTAL_HISTORY data (for Customer with ID 2)
--INSERT INTO CAR_RENTAL_HISTORY (Customer_User_ID, Client_Car_ID, Rent_Date, Return_Date, renter_feedback) VALUES
--(2, 4, '2024-01-01', '2024-01-15', 'Great experience, car was in perfect condition'),
--(2, 5, '2024-02-01', '2024-02-15', 'Smooth rental process, would rent again');

---- Insert RATING data
--INSERT INTO RATING (User_ID, Client_Car_ID, Rating_Count, Review_ID) VALUES
--(2, 1, 4.5, 'Excellent car, very well maintained'),
--(2, 2, 4.0, 'Good condition, smooth drive'),
--(2, 3, 5.0, 'Brand new car, perfect condition'),
--(2, 4, 4.2, 'Great rental experience');

---- Insert MESSAGE data
--INSERT INTO MESSAGE (Sender_ID, Receiver_ID, Message) VALUES
--(2, 7, 'Interested in the Honda Civic'),
--(7, 2, 'Sure, when would you like to see it?'),
--(2, 7, 'Is the price negotiable?'),
--(7, 2, 'Yes, we can discuss the price');

---- Insert TRANSACTIONS data
--INSERT INTO TRANSACTIONS (Car_id, Sender_ID, Receiver_ID, amount, transaction_type, payment_method, status) VALUES
--(1, 2, 7, 5000000.00, 'Car Purchase', 'Wallet', 'Completed'),
--(4, 2, 7, 75000.00, 'Rental Payment', 'Credit Card', 'Completed'),
--(5, 2, 7, 65000.00, 'Rental Payment', 'Cash', 'Completed'),
--(2, 2, 7, 50000.00, 'Rental Payment', 'Wallet', 'Pending');

---- Update SELLER statistics
--UPDATE SELLER 
--SET total_cars_sold = 1,  -- Only one car has been sold (Car_id 1)
--    rating = 4.5         -- Average of ratings
--WHERE Seller_ID = 7;

---- Update RENTER statistics
--UPDATE RENTER
--SET total_rentals = 0    -- No rentals yet for the renter (ID 6)
--WHERE Renter_ID = 6;

---- Update Customer statistics
--UPDATE Customer
--SET total_cars_purchased = 1,                              -- One car purchased
--    total_spent = 5140000.00,                             -- Purchase + rentals
--    wallet_balance = 100000.00                            -- Remaining balance
--WHERE Customer_ID = 2;

-- First, let's insert into Make, Model, and Variant tables (if they don't exist)
--INSERT INTO Make (MakeName, Country) 
--VALUES ('Toyota', 'Japan');

--INSERT INTO Model (MakeID, ModelName, Category)
--VALUES (
--    (SELECT MakeID FROM Make WHERE MakeName = 'Toyota'),
--    'Camry',
--    'Sedan'
--);

--INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission)
--VALUES (
--    (SELECT ModelID FROM Model WHERE ModelName = 'Camry'),
--    'XLE',
--    'Petrol',
--    'Automatic'
--);

---- Insert the car
--INSERT INTO Car (VariantID, Color, Year, Description)
--VALUES (
--    (SELECT VariantID FROM Variant WHERE VariantName = 'XLE'),
--    'Black',
--    2020,
--    'Well-maintained Toyota Camry XLE with premium features'
--);

---- Insert into Client_Car
--INSERT INTO Client_Car (
--    Client_Car_ID,
--    VIN,
--    Client_ID,
--    carID,
--    Condition,
--    Location,
--    Availability
--)
--VALUES (
--    (SELECT TOP 1 CarID FROM Car ORDER BY CarID DESC), -- Using the latest CarID
--    'JH4DA9460MS032366',
--    6, -- User ID 6
--    (SELECT TOP 1 CarID FROM Car ORDER BY CarID DESC), -- Using the latest CarID
--    '8',
--    'Islamabad',
--    1
--);



---- Let's add another car for the same user
--INSERT INTO Make (MakeName, Country) 
--VALUES ('Honda', 'Japan');

--INSERT INTO Model (MakeID, ModelName, Category)
--VALUES (
--    (SELECT MakeID FROM Make WHERE MakeName = 'Honda'),
--    'Civic',
--    'Sedan'
--);

--INSERT INTO Variant (ModelID, VariantName, FuelType, Transmission)
--VALUES (
--    (SELECT ModelID FROM Model WHERE ModelName = 'Civic'),
--    'RS',
--    'Petrol',
--    'Automatic'
--);

---- Insert second car
--INSERT INTO Car (VariantID, Color, Year, Description)
--VALUES (
--    (SELECT VariantID FROM Variant WHERE VariantName = 'RS'),
--    'White',
--    2022,
--    'Brand new Honda Civic RS with full options package'
--);

---- Insert into Client_Car for second car
--INSERT INTO Client_Car (
--    Client_Car_ID,
--    VIN,
--    Client_ID,
--    carID,
--    Condition,
--    Location,
--    Availability
--)
--VALUES (
--    (SELECT TOP 1 CarID FROM Car ORDER BY CarID DESC),
--    '5FNRL6H58KB133711',
--    6,
--    (SELECT TOP 1 CarID FROM Car ORDER BY CarID DESC),
--    '9',
--    'Lahore',
--    1
--);

---- Insert second car into CARS_ON_RENT
--INSERT INTO CARS_ON_RENT (
--    Client_Car_ID,
--    start_date,
--    end_date,
--    total_price,
--    security_deposit,
--    status
--)
--VALUES (
--    (SELECT TOP 1 Client_Car_ID FROM Client_Car ORDER BY Client_Car_ID DESC),
--    '2024-03-15',
--    '2024-05-15',
--    200000.00,
--    75000.00,
--    'Available'
--);

---------------------------------------------------------------------------------------------------------------------------

 SELECT * FROM Users;
 SELECT * FROM UserBio;
 SELECT * FROM UserAuth;
 SELECT * FROM CLIENT;
 SELECT * FROM SELLER;
 SELECT * FROM RENTER;
 SELECT * FROM Customer;
 SELECT * FROM Make;
 SELECT * FROM Model;
 SELECT * FROM Variant;
 SELECT * FROM VariantColor;
 SELECT * FROM Car;
 SELECT * FROM Client_Car;
 SELECT * FROM CARS_ON_SALE;
 SELECT * FROM CARS_ON_RENT;
 SELECT * FROM CAR_RENTAL_HISTORY;
 SELECT * FROM RATING;
 SELECT * FROM MESSAGE;
 SELECT * FROM TRANSACTIONS;

