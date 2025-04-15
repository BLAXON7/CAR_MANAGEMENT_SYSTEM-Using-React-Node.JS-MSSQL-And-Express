--Drop DATABASE CarRentalSystem
CREATE DATABASE CarRentalSystem;
--USE CarRentalSystem;
CREATE TABLE Users (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(100) UNIQUE NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Role VARCHAR(20) CHECK (Role IN ('Seller', 'Renter', 'Client')) NOT NULL,
    Phone_Number VARCHAR(20) UNIQUE,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARBINARY(256) NOT NULL,  -- Store Hashed Passwords
    Previous_Password VARBINARY(256),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(), -- Tracks Last Update
    Last_Login DATETIME NULL,
    Profile_Pic VARCHAR(255),
    Verification_Status BIT DEFAULT 0,
    Account_Status VARCHAR(20) CHECK (Account_Status IN ('Active', 'Suspended', 'Banned')) DEFAULT 'Active',
    Failed_Login_Attempts INT DEFAULT 0,
    Last_Failed_Login DATETIME NULL
);

GO
CREATE TRIGGER trg_UpdateTimestamp
ON Users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Users
    SET UpdatedAt = GETDATE()
    FROM Users u
    INNER JOIN inserted i ON u.userID = i.userID;
END;
GO

CREATE TABLE SELLER (
    Seller_ID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT UNIQUE,
    total_cars_sold INT DEFAULT 0,
    rating FLOAT DEFAULT 0.0 CHECK (rating BETWEEN 0.0 AND 5.0),
    wallet_balance DECIMAL(10,2) DEFAULT 0.0,
    verification_status BIT DEFAULT 0,
	Client_ID INT UNIQUE,  -- 
    --FOREIGN KEY (Client_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);
CREATE TABLE RENTER (
    Renter_ID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT UNIQUE, 
    total_rentals INT DEFAULT 0,
    wallet_balance DECIMAL(10,2) DEFAULT 0.0,
    total_spent DECIMAL(10,2) DEFAULT 0.0,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);
CREATE TABLE CLIENT (
    Client_ID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT UNIQUE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

CREATE TABLE BUYER (
    Buyer_ID INT IDENTITY(1,1) PRIMARY KEY,
    Client_ID INT UNIQUE,  -- A buyer is also a client
    total_cars_purchased INT DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0.0,
    wallet_balance DECIMAL(10,2) DEFAULT 0.0,
    FOREIGN KEY (Client_ID) REFERENCES CLIENT(Client_ID) ON DELETE CASCADE
);

CREATE TABLE CAR_DETAILS (
    carID INT IDENTITY(1,1) PRIMARY KEY,
    Make VARCHAR(100),
    Model VARCHAR(100),
    Variant VARCHAR(100),
    year INT CHECK (year BETWEEN 1900 AND YEAR(GETDATE())),
    Description TEXT,
    Condition VARCHAR(10) CHECK (Condition IN ('New', 'Used')),
    Category VARCHAR(100),
    Location VARCHAR(255),
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    VIN VARCHAR(17) UNIQUE,
    availability BIT DEFAULT 1  -- 1 = Available, 0 = Not Available
);

CREATE TABLE CARS_ON_SALE (
    carID INT PRIMARY KEY,
    sellerID INT,
    Availability BIT DEFAULT 1,
    Price DECIMAL(10,2) CHECK (Price >= 0),
    negotiable_price BIT DEFAULT 0,
    listed_at DATETIME DEFAULT GETDATE(),
    listing_expiry DATETIME DEFAULT DATEADD(DAY, 30, GETDATE()), -- Expires in 30 days
    FOREIGN KEY (carID) REFERENCES CAR_DETAILS(carID) ON DELETE CASCADE,
    FOREIGN KEY (sellerID) REFERENCES SELLER(Seller_ID) ON DELETE CASCADE
);
CREATE TABLE CARS_ON_RENT (
    rental_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT,
    renter_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10,2) CHECK (total_price >= 0),
    security_deposit DECIMAL(10,2) DEFAULT 0.0,
    status VARCHAR(20) CHECK (status IN ('Available', 'Rented', 'Returned')),
    rented_at DATETIME DEFAULT GETDATE(),
    extension_requested BIT DEFAULT 0,
    FOREIGN KEY (car_id) REFERENCES CAR_DETAILS(carID) ON DELETE NO ACTION,
    FOREIGN KEY (renter_id) REFERENCES RENTER(Renter_ID) ON DELETE NO ACTION,
    CONSTRAINT CHK_EndDate CHECK (end_date >= start_date)
);

CREATE TABLE CAR_RENTAL_HISTORY (
    history_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT NOT NULL,
    renter_id INT NOT NULL,
    client_id INT NOT NULL,
    Rent_Date DATE NOT NULL,
    Return_Date DATE NOT NULL,
    renter_feedback TEXT,
    FOREIGN KEY (car_id) REFERENCES CAR_DETAILS(carID) ON DELETE NO ACTION,
    FOREIGN KEY (renter_id) REFERENCES RENTER(Renter_ID) ON DELETE NO ACTION,
    FOREIGN KEY (client_id) REFERENCES CLIENT(Client_ID) ON DELETE NO ACTION,
    CONSTRAINT CHK_ReturnDate CHECK (Return_Date >= Rent_Date)
);

CREATE TABLE PURCHASE (
    Purchase_ID INT IDENTITY(1,1) PRIMARY KEY,
    Client_ID INT ,
    Seller_ID INT ,
    Car_ID INT NOT NULL,
    Cost_Price DECIMAL(10,2) CHECK (Cost_Price >= 0),
    Discount DECIMAL(10,2) DEFAULT 0.0,
    Sale_Price AS (Cost_Price - Discount) PERSISTED,
    Time DATETIME DEFAULT GETDATE(),
    payment_method VARCHAR(50) CHECK (payment_method IN ('Cash', 'Credit Card', 'Wallet')),
    FOREIGN KEY (Client_ID) REFERENCES CLIENT(Client_ID) ON DELETE NO ACTION,
    FOREIGN KEY (Seller_ID) REFERENCES SELLER(Seller_ID) ON DELETE SET NULL,
    FOREIGN KEY (Car_ID) REFERENCES CAR_DETAILS(carID) ON DELETE CASCADE
);
CREATE TABLE RATING (
    Rating_ID INT IDENTITY(1,1) PRIMARY KEY,
    User_ID INT NOT NULL,
    Car_ID INT NOT NULL,
    Rating_Count FLOAT CHECK (Rating_Count BETWEEN 1.0 AND 5.0),
    Review_ID TEXT NULL,
    FOREIGN KEY (User_ID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (Car_ID) REFERENCES CAR_DETAILS(carID) ON DELETE CASCADE
);
CREATE TABLE MESSAGE (
    Message_ID INT IDENTITY(1,1) PRIMARY KEY,
    Sender_ID INT NOT NULL,
    Receiver_ID INT ,
    Message TEXT NOT NULL,
    Sent_Time DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (Sender_ID) REFERENCES Users(userID) ON DELETE NO ACTION,
    FOREIGN KEY (Receiver_ID) REFERENCES Users(userID) ON DELETE SET NULL
);
CREATE TABLE TRANSACTIONS (
    transaction_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('Rental Payment', 'Car Purchase', 'Refund', 'Penalty', 'Wallet Recharge')) NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('Cash', 'Credit Card', 'Wallet')) DEFAULT 'Wallet',
    status VARCHAR(20) CHECK (status IN ('Pending', 'Completed', 'Failed')) DEFAULT 'Pending',
    transaction_date DATETIME DEFAULT GETDATE(),
    Reference_ID INT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Indexes

-- We have created indexes over here. We will later analyze which indexes are not needed and then drop them.

CREATE INDEX idx_UserName ON Users(UserName);
CREATE INDEX idx_CarMakeModel ON CAR_DETAILS(Make, Model);
CREATE INDEX idx_SellerID ON CARS_ON_SALE(sellerID);
CREATE INDEX idx_RenterID ON CARS_ON_RENT(renter_id);
CREATE INDEX idx_UserEmail ON Users(Email);
CREATE INDEX idx_CarPrice ON CARS_ON_SALE(Price);
CREATE INDEX idx_CarRentalStatus ON CARS_ON_RENT(status);
CREATE INDEX idx_PurchaseDate ON PURCHASE(Time);
CREATE INDEX idx_FailedLogins ON Users(Failed_Login_Attempts);
CREATE INDEX idx_TransactionUser ON TRANSACTIONS(user_id);
------CREATE FULLTEXT INDEX idx_CarDetails ON CAR_DETAILS (Make, Model, Variant);
-- We need to first verify if full text is installed or not for the following queries
CREATE FULLTEXT CATALOG CarDetails_FTC AS DEFAULT;
CREATE FULLTEXT INDEX ON CAR_DETAILS (Make LANGUAGE 1033, Model LANGUAGE 1033, Variant LANGUAGE 1033)
KEY INDEX UQ_CarDetails
ON CarDetails_FTC;


-- Views
GO
CREATE VIEW AvailableCarsForSale AS
SELECT CS.carID, Make, Model, Price, CS.Availability
FROM CARS_ON_SALE CS
JOIN CAR_DETAILS CD ON CS.carID = CD.carID
WHERE CS.Availability = 1;
GO

GO
CREATE VIEW AvailableCarsForRent AS
SELECT CR.car_id, Make, Model, total_price, start_date, end_date, status
FROM CARS_ON_RENT CR
JOIN CAR_DETAILS CD ON CR.car_id = CD.carID
WHERE CR.status = 'Available';
GO

GO
CREATE VIEW TopRatedCars AS
SELECT 
    C.carID, 
    C.Make, 
    C.Model, 
    AVG(R.Rating_Count) AS avgRating
FROM RATING R
JOIN CAR_DETAILS C ON R.Car_ID = C.carID
GROUP BY C.carID, C.Make, C.Model
HAVING AVG(R.Rating_Count) >= 4.0;  -- NOTE: to get the topratedcars, we need to use order by in that query
GO

GO
CREATE VIEW UserRentalHistory AS
SELECT CRH.renter_id, CD.Make, CD.Model, CRH.Rent_Date, CRH.Return_Date
FROM CAR_RENTAL_HISTORY CRH
JOIN CAR_DETAILS CD ON CRH.car_id = CD.carID;
GO
-- Procedures
-----We have employed error handling and hashing in a few of the following procedures. We will later implement error handling and hashing using JS and its frameworks. 
-----Additionally, we have also added a few of the Transact-SQL functions like commit and rollback
--1

CREATE PROCEDURE SignUpUser
    @UserName VARCHAR(100),
    @Name VARCHAR(255),
    @Role VARCHAR(20),
    @Phone_Number VARCHAR(20),
    @Email VARCHAR(255),
    @Password NVARCHAR(255)
AS
BEGIN
    INSERT INTO Users (UserName, Name, Role, Phone_Number, Email, Password)
    VALUES (@UserName, @Name, @Role, @Phone_Number, @Email, HASHBYTES('SHA2_256', @Password));


    -- If the user is a Seller, insert into SELLER table
    DECLARE @UserID INT = SCOPE_IDENTITY();
    IF @Role = 'Seller'
    BEGIN
        INSERT INTO SELLER (userID) VALUES (@UserID);
    END
    
    -- If the user is a Renter, insert into RENTER table
    IF @Role = 'Renter'
    BEGIN    
        INSERT INTO RENTER (userID) VALUES (@UserID);
    END

    -- If the user is a Client, insert into CLIENT table
    IF @Role = 'Client'
    BEGIN
        INSERT INTO CLIENT (userID) VALUES (@UserID);
    END
END;
GO

--2
GO
CREATE PROCEDURE LoginUser
    @UserName VARCHAR(100),
    @Password NVARCHAR(255)
AS
BEGIN
    DECLARE @StoredPassword VARBINARY(256), @FailedAttempts INT;
    
    SELECT @StoredPassword = Password, @FailedAttempts = Failed_Login_Attempts 
    FROM Users WHERE UserName = @UserName;
    
    IF @StoredPassword IS NULL
    BEGIN
        RAISERROR ('User not found.', 16, 1);
        RETURN;
    END

    -- Check if user is already suspended
    IF @FailedAttempts >= 5
    BEGIN
        UPDATE Users SET Account_Status = 'Suspended' WHERE UserName = @UserName;
        RAISERROR ('Account is suspended due to too many failed login attempts.', 16, 1);
        RETURN;
    END

    -- Compare hashed password securely
    IF @StoredPassword = HASHBYTES('SHA2_256', @Password)
    BEGIN
        UPDATE Users SET Last_Login = GETDATE(), Failed_Login_Attempts = 0 WHERE UserName = @UserName;
        SELECT UserID, UserName, Role, Last_Login FROM Users WHERE UserName = @UserName;
    END
    ELSE
    BEGIN
        UPDATE Users SET Failed_Login_Attempts = Failed_Login_Attempts + 1 WHERE UserName = @UserName;
        RAISERROR ('Invalid login credentials!', 16, 1);
    END
END;


GO
--3
CREATE PROCEDURE UpdateProfile
    @UserID INT,
    @Name VARCHAR(255) = NULL,
    @Phone_Number VARCHAR(20) = NULL,
    @Email VARCHAR(255) = NULL,
    @Profile_Pic VARCHAR(255) = NULL
AS
BEGIN
    UPDATE Users
    SET 
        Name = ISNULL(@Name, Name),
        Phone_Number = ISNULL(@Phone_Number, Phone_Number),
        Email = ISNULL(@Email, Email),
        Profile_Pic = ISNULL(@Profile_Pic, Profile_Pic)
    WHERE userID = @UserID;
END;

GO
--4
CREATE PROCEDURE CompareCars
    @CarID1 INT,
    @CarID2 INT
AS
BEGIN
    SELECT * FROM CAR_DETAILS WHERE carID IN (@CarID1, @CarID2);
END;

GO
--5
CREATE PROCEDURE AddCarReview
    @UserID INT,
    @CarID INT,
    @Rating_Count FLOAT,
    @Review_ID TEXT
AS
BEGIN
    INSERT INTO RATING (User_ID, Car_ID, Rating_Count, Review_ID)
    VALUES (@UserID, @CarID, @Rating_Count, @Review_ID);
END;

GO
--6
CREATE PROCEDURE GetSellerDashboard 
    @SellerID INT
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM CARS_ON_SALE WHERE sellerID = @SellerID) AS TotalListedCars,
        (SELECT COUNT(*) FROM PURCHASE WHERE Seller_ID = @SellerID) AS TotalSoldCars,
        (SELECT AVG(Rating_Count) FROM RATING WHERE Car_ID IN (SELECT carID FROM CARS_ON_SALE WHERE sellerID = @SellerID)) AS SellerRating;
END;
GO

--7
CREATE PROCEDURE GetUserDashboard 
    @UserID INT
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM RATING WHERE User_ID = @UserID) AS TotalReviewsGiven,
        (SELECT COUNT(*) FROM CAR_RENTAL_HISTORY WHERE renter_id = @UserID) AS TotalRentals;
END;

GO
--8
CREATE PROCEDURE GetRenterDashboard
    @RenterID INT
AS
BEGIN
    SELECT 
        total_rentals,
        wallet_balance,
        total_spent
    FROM RENTER
    WHERE Renter_ID = @RenterID;
END;
GO

--9
CREATE PROCEDURE GetCarPricing
    @CarID INT
AS
BEGIN
    SELECT Price, negotiable_price, listing_expiry
    FROM CARS_ON_SALE
    WHERE carID = @CarID;
END;
GO

--10
CREATE PROCEDURE BookCar
    @CarID INT,
    @RenterID INT,
    @StartDate DATE,
    @EndDate DATE,
    @TotalPrice DECIMAL(10,2),
    @SecurityDeposit DECIMAL(10,2)
AS
BEGIN
    BEGIN TRANSACTION;
    IF EXISTS (SELECT 1 FROM CARS_ON_RENT WHERE car_id = @CarID AND status = 'Rented')
    BEGIN
        ROLLBACK;
        RAISERROR ('Car is already booked!', 16, 1);
        RETURN;
    END

    INSERT INTO CARS_ON_RENT (car_id, renter_id, start_date, end_date, total_price, security_deposit, status)
    VALUES (@CarID, @RenterID, @StartDate, @EndDate, @TotalPrice, @SecurityDeposit, 'Rented');
    COMMIT;
END;
GO

--11
CREATE PROCEDURE UpdateCarPrice
    @CarID INT,
    @NewPrice DECIMAL(10,2)
AS
BEGIN
    UPDATE CARS_ON_SALE
    SET Price = @NewPrice
    WHERE carID = @CarID;
END;
GO

--12
CREATE PROCEDURE GetCarPriceTrends 
AS
BEGIN
    SELECT CD.carID, Model, Make, Price, listed_at 
    FROM CARS_ON_SALE AS CS
    JOIN CAR_DETAILS AS CD ON CS.carID = CD.carID
    ORDER BY listed_at DESC;
END;
GO

--13
CREATE PROCEDURE AddSupportTicket
    @SenderID INT,
    @ReceiverID INT,
    @Message TEXT
AS
BEGIN
    INSERT INTO MESSAGE (Sender_ID, Receiver_ID, Message)
    VALUES (@SenderID, @ReceiverID, @Message);
END;
GO

--14
CREATE PROCEDURE GetUserProfile
    @UserID INT
AS
BEGIN
    SELECT 
        UserName, Name, Phone_Number, Email, Profile_Pic,
        (SELECT car_id FROM CARS_ON_RENT WHERE renter_id = @UserID) AS BookedCars
    FROM Users
    WHERE userID = @UserID;
END;
GO

--15
CREATE PROCEDURE ApplyDiscount
    @RenterID INT,
    @Discount DECIMAL(10,2)
AS
BEGIN
    BEGIN TRANSACTION;
    UPDATE RENTER
    SET wallet_balance = wallet_balance + @Discount
    WHERE Renter_ID = @RenterID;
    COMMIT;
END;
GO

-- CREATE PROCEDURE ApplyDiscount
--     @RenterID INT,
--     @Discount DECIMAL(10,2)
-- AS
-- BEGIN
--     UPDATE RENTER
--     SET wallet_balance = wallet_balance + @Discount
--     WHERE Renter_ID = @RenterID;
-- END;
-- GO

--16
CREATE PROCEDURE AddRentingAudit
    @CarID INT,
    @RenterID INT,
    @ClientID INT,
    @Rent_Date DATE,
    @Return_Date DATE,
    @Renter_Feedback TEXT
AS
BEGIN
    INSERT INTO CAR_RENTAL_HISTORY (car_id, renter_id, client_id, Rent_Date, Return_Date, renter_feedback)
    VALUES (@CarID, @RenterID, @ClientID, @Rent_Date, @Return_Date, @Renter_Feedback);
END;
GO

--17
CREATE PROCEDURE GetCarAnalysis
    @CarID INT
AS
BEGIN
    SELECT Make, Model, Variant, year, Description, Condition, Category, fuel_type, transmission
    FROM CAR_DETAILS
    WHERE carID = @CarID;
END;
GO

--18
CREATE PROCEDURE UpdateBuyerLevel
    @ClientID INT,
    @TotalSpent DECIMAL(10,2)
AS
BEGIN
    UPDATE BUYER
    SET total_spent = total_spent + @TotalSpent
    WHERE Client_ID = @ClientID;
	UPDATE SELLER
    SET wallet_balance = wallet_balance + @TotalSpent
    WHERE Client_ID = @ClientID;
END;
GO

--19
CREATE PROCEDURE FilterCars
    @Brand VARCHAR(100) = NULL,
    @MinPrice DECIMAL(10,2) = NULL,
    @MaxPrice DECIMAL(10,2) = NULL,
    @Transmission VARCHAR(50) = NULL
AS
BEGIN
    SELECT *
    FROM CAR_DETAILS AS CD
    JOIN CARS_ON_SALE AS CS ON CD.carID = CS.carID
    WHERE 
        (@Brand IS NULL OR Make = @Brand) AND
        (@MinPrice IS NULL OR Price >= @MinPrice) AND
        (@MaxPrice IS NULL OR Price <= @MaxPrice) AND
        (@Transmission IS NULL OR transmission = @Transmission);
END;
GO

CREATE PROCEDURE FilterCars2
    @Brand VARCHAR(100) = NULL,
    @MinPrice DECIMAL(10,2) = NULL,
    @MaxPrice DECIMAL(10,2) = NULL,
    @Transmission VARCHAR(50) = NULL
AS
BEGIN
    SELECT *
    FROM CAR_DETAILS AS CD
    JOIN CARS_ON_RENT AS CR ON CD.carID = CR.car_id
    WHERE 
        (@Brand IS NULL OR Make = @Brand) AND
        (@MinPrice IS NULL OR total_price >= @MinPrice) AND
        (@MaxPrice IS NULL OR total_price <= @MaxPrice) AND
        (@Transmission IS NULL OR transmission = @Transmission);
END;
GO

--20
CREATE PROCEDURE AddCar
    @SellerID INT,
    @Make VARCHAR(100),
    @Model VARCHAR(100),
    @Variant VARCHAR(100),
    @Year INT,
    @Price DECIMAL(10,2),
    @FuelType VARCHAR(50),
    @Transmission VARCHAR(50),
    @Condition VARCHAR(50),
    @Description TEXT
AS
BEGIN
    INSERT INTO Cars (SellerID, Make, Model, Variant, Year, Price, FuelType, Transmission, Condition, Description)
    VALUES (@SellerID, @Make, @Model, @Variant, @Year, @Price, @FuelType, @Transmission, @Condition, @Description);
END;
GO

--21
CREATE PROCEDURE DeleteCar
    @CarID INT
AS
BEGIN
    DELETE FROM Cars WHERE CarID = @CarID;
END;
GO

--22
CREATE PROCEDURE CancelBooking
    @RentalID INT
AS
BEGIN
    UPDATE CarRentals SET Status = 'Cancelled' WHERE RentalID = @RentalID;
END;
GO

--23
CREATE PROCEDURE GetCarReviews
    @CarID INT
AS
BEGIN
    SELECT Users.UserName, CarReviews.Rating, CarReviews.ReviewText, CarReviews.ReviewDate
    FROM CarReviews
    JOIN Users ON CarReviews.UserID = Users.UserID
    WHERE CarReviews.CarID = @CarID;
END;
GO

--24
CREATE PROCEDURE GetUserMessages
    @UserID INT
AS
BEGIN
    SELECT Sender_ID, Receiver_ID, Message, Sent_Time
    FROM MESSAGE
    WHERE Receiver_ID = @UserID OR Sender_ID = @UserID
    ORDER BY Sent_Time DESC;
END;
GO

--25
CREATE PROCEDURE ReturnCar
    @RentalID INT
AS
BEGIN
    BEGIN TRANSACTION;
    DECLARE @CarID INT;
    SELECT @CarID = car_id FROM CARS_ON_RENT WHERE rental_id = @RentalID AND status = 'Rented';
    IF @CarID IS NULL
    BEGIN
        ROLLBACK;
        RAISERROR ('Invalid rental or already completed.', 16, 1);
        RETURN;
    END
    
    UPDATE CARS_ON_RENT SET status = 'Returned' WHERE rental_id = @RentalID;
    UPDATE CAR_DETAILS SET Availability = 1 WHERE carID = @CarID;
    COMMIT;
END;
GO

--26
-- Reporting: Get Total Revenue & Active Rentals
CREATE PROCEDURE GetRentalReport
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM CarRentals WHERE status = 'Active') AS activeRentals,
        (SELECT COALESCE(SUM(totalAmount), 0) FROM CarRentals WHERE status = 'Completed') AS totalRevenue;
END;
GO

--27
-- Reporting: Top 5 Cars by Rating
CREATE PROCEDURE GetTopRatedCars
AS
BEGIN
    SELECT C.carID, C.Make, C.Model, AVG(R.Rating_Count) AS avgRating
    FROM RATING R
    INNER JOIN CAR_DETAILS C ON R.Car_ID = C.carID
    GROUP BY C.carID, C.Make, C.Model
    ORDER BY avgRating DESC, C.carID
    OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
END;
GO

--28
CREATE PROCEDURE SearchCars(@SearchTerm VARCHAR(100))
AS
BEGIN
    SELECT TOP 10 Make, Model, Variant 
    FROM CAR_DETAILS 
    WHERE Make LIKE '%' + @SearchTerm + '%' 
       OR Model LIKE '%' + @SearchTerm + '%'
    ORDER BY Make, Model, Variant;
END;
GO

--29
CREATE PROCEDURE ResetPassword
    @Email VARCHAR(255),
    @OldPassword NVARCHAR(255),
    @NewPassword NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @UserID INT, @StoredPassword VARBINARY(256);
        
        SELECT @UserID = userID, @StoredPassword = Password 
        FROM Users 
        WHERE LOWER(Email) = LOWER(@Email);
        
        IF @UserID IS NULL
        BEGIN
            ROLLBACK TRANSACTION;
            RAISERROR('User not found.', 16, 1);
            RETURN;
        END
        
        IF @StoredPassword != HASHBYTES('SHA2_256', @OldPassword)
        BEGIN
            ROLLBACK TRANSACTION;
            RAISERROR('Current password is incorrect.', 16, 1);
            RETURN;
        END
        
        UPDATE Users 
        SET 
            Previous_Password = Password,
            Password = HASHBYTES('SHA2_256', @NewPassword),
            UpdatedAt = GETDATE()
        WHERE userID = @UserID;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

--30
CREATE PROCEDURE SearchCarsWithFeatures
    @SearchTerm VARCHAR(100) = NULL,
    @MinPrice DECIMAL(10,2) = NULL,
    @MaxPrice DECIMAL(10,2) = NULL,
    @Features VARCHAR(MAX) = NULL -- Comma-separated list of feature IDs
AS
BEGIN
    DECLARE @FeatureTable TABLE (feature_id INT);

    -- Convert @Features string into table format
    IF @Features IS NOT NULL
    BEGIN
        INSERT INTO @FeatureTable (feature_id)
        SELECT CAST(value AS INT) FROM STRING_SPLIT(@Features, ',');
    END

    -- Perform search with feature filtering
    SELECT DISTINCT CD.carID, CD.Make, CD.Model, CD.Variant, CS.Price
    FROM CAR_DETAILS CD
    JOIN CARS_ON_SALE CS ON CD.carID = CS.carID
    LEFT JOIN CAR_FEATURE_MAPPING CFM ON CD.carID = CFM.car_id
    LEFT JOIN @FeatureTable FT ON CFM.feature_id = FT.feature_id
    WHERE 
        (@SearchTerm IS NULL OR 
         CD.Make LIKE '%' + @SearchTerm + '%' OR 
         CD.Model LIKE '%' + @SearchTerm + '%')
        AND (@MinPrice IS NULL OR CS.Price >= @MinPrice)
        AND (@MaxPrice IS NULL OR CS.Price <= @MaxPrice)
        AND (@Features IS NULL OR FT.feature_id IS NOT NULL)
    ORDER BY CD.Make, CD.Model;
END;
GO

exec SignUpUser 'john_doe', 'John Doe', 'Seller', '1234567890', 'l@yahoo.com', 'password';
exec SignUpUser 'jane_doe', 'Jane Doe', 'Renter', '1234567891', 'm@gmail.com', 'password';
exec SignUpUser 'ali', 'Jane Doe', 'Renter', '1234567892', 'p@gmail.com', '123456789';

exec LoginUser 'ali','123456789';

exec LoginUser 'john_doe', 'password';
exec LoginUser 'jane_doe', 'password';
exec LoginUser 'john_doe', 'password123';

exec UpdateProfile 1, 'John Doe', '1234567890', 'ba', 'profile.jpg';

exec AddCar 1, 'Toyota', 'Corolla', 'GLI', 2020, 1500, 'Petrol', 'Automatic', 'New car';
exec AddCar 2, 'Honda', 'Civic', 'VTI', 2019, 2000, 'Petrol', 'Automatic', 'Used car';

SELECT * FROM CAR_DETAILS;

exec CompareCars 1, 2;

exec AddCarReview 1, 1, 4.5, 'Good car';
exec AddCarReview 2, 1, 3.5, 'Average car';

exec GetSellerDashboard 1;
exec GetUserDashboard 1;
exec GetRenterDashboard 2;

exec GetCarPricing 1;
exec BookCar 1, 2, '2021-01-01', '2021-01-10', 1000, 100;
exec UpdateCarPrice 1, 1200;
exec GetCarPriceTrends;

exec AddSupportTicket 1, 2, 'Help needed';
exec GetUserProfile 1;
exec ApplyDiscount 2, 50;
exec AddRentingAudit 1, 2, 1, '2021-01-01', '2021-01-10', 'Good experience';

exec GetCarAnalysis 1;
exec UpdateBuyerLevel 1, 1000;

exec FilterCars1 'Toyota', 1000, 2000, 'Automatic';
exec FilterCars2 'Toyota', 1000, 2000, 'Automatic';

exec AddCar 1, 'Toyota', 'Corolla', 'GLI', 2020, 1500, 'Petrol', 'Automatic', 'New car';
SELECT * FROM Cars;
exec DeleteCar 1;
exec CancelBooking 1;
exec GetCarReviews 1;
exec GetUserMessages 1;
exec ReturnCar 1;

exec GetRentalReport;
exec GetTopRatedCars;





SELECT * FROM Users;
SELECT * FROM SELLER;
SELECT * FROM RENTER;
SELECT * FROM CLIENT;
SELECT * FROM CAR_DETAILS;
SELECT * FROM CARS_ON_SALE;
SELECT * FROM CARS_ON_RENT;
SELECT * FROM CAR_RENTAL_HISTORY;
SELECT * FROM PURCHASE;
SELECT * FROM RATING;
SELECT * FROM MESSAGE;
SELECT * FROM TRANSACTIONS;