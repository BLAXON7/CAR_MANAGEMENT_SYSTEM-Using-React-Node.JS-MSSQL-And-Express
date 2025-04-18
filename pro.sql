CREATE DATABASE CarRentalSystem;
USE CarRentalSystem;
CREATE TABLE Users (
    userID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('Seller', 'Renter', 'Client')) NOT NULL,
    Phone_Number VARCHAR(20) UNIQUE,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL CHECK (LEN(Password) >= 8),
    Previous_Password VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    last_login DATETIME NULL,
    Profile_Pic VARCHAR(255),
    verification_status BIT DEFAULT 0,
    account_status VARCHAR(20) CHECK (account_status IN ('Active', 'Suspended', 'Banned')) DEFAULT 'Active'
);
CREATE TABLE SELLER (
    Seller_ID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT UNIQUE,
    total_cars_sold INT DEFAULT 0,
    rating FLOAT DEFAULT 0.0 CHECK (rating BETWEEN 0.0 AND 5.0),
    wallet_balance DECIMAL(10,2) DEFAULT 0.0,
    verification_status BIT DEFAULT 0,
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
    VIN VARCHAR(17) UNIQUE
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

--1
--1
CREATE PROCEDURE SignUpUser
    @UserName VARCHAR(100),
    @Name VARCHAR(255),
    @Role VARCHAR(20),
    @Phone_Number VARCHAR(20),
    @Email VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    INSERT INTO Users (UserName, Name, Role, Phone_Number, Email, Password)
    VALUES (@UserName, @Name, @Role, @Phone_Number, @Email, @Password);

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


--2
CREATE PROCEDURE LoginUser
    @UserName VARCHAR(100),
    @Password NVARCHAR(255)
AS
BEGIN
    DECLARE @StoredPassword VARBINARY(256);
    DECLARE @Salt UNIQUEIDENTIFIER;

    -- Get user salt
    SELECT @Salt = Salt FROM Users WHERE UserName = @UserName;

    -- Hash input password with retrieved salt
    SET @StoredPassword = HASHBYTES('SHA2_256', CONCAT(@Password, @Salt));

    IF NOT EXISTS (SELECT 1 FROM Users WHERE email = @Email)
    BEGIN
        RAISERROR ('User not found.', 16, 1);
        RETURN;
    END
    -- Authenticate
    IF EXISTS (SELECT 1 FROM Users WHERE UserName = @UserName AND PasswordHash = @StoredPassword)
    BEGIN
        UPDATE Users SET LastLogin = GETDATE() WHERE UserName = @UserName;
        SELECT UserID, UserName, Role, LastLogin FROM Users WHERE UserName = @UserName;
    END
    ELSE
    BEGIN
        RAISERROR ('Invalid login credentials!', 16, 1);
    END
END;


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

--4
CREATE PROCEDURE CompareCars
    @CarID1 INT,
    @CarID2 INT
AS
BEGIN
    SELECT * FROM CAR_DETAILS WHERE carID IN (@CarID1, @CarID2);
END;


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


--7
CREATE PROCEDURE GetUserDashboard 
    @UserID INT
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM RATING WHERE User_ID = @UserID) AS TotalReviewsGiven,
        (SELECT COUNT(*) FROM CAR_RENTAL_HISTORY WHERE renter_id = @UserID) AS TotalRentals;
END;

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

--9
CREATE PROCEDURE GetCarPricing
    @CarID INT
AS
BEGIN
    SELECT Price, negotiable_price, listing_expiry
    FROM CARS_ON_SALE
    WHERE carID = @CarID;
END;


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
    -- Check if car is available
    IF EXISTS (SELECT 1 FROM CarRentals WHERE CarID = @CarID AND Status = 'Booked')
    BEGIN
        RAISERROR ('Car is already booked!', 16, 1);
        RETURN;
    END

    -- Insert rental booking
    INSERT INTO CarRentals (CarID, RenterID, StartDate, EndDate, TotalPrice, SecurityDeposit, Status)
    VALUES (@CarID, @RenterID, @StartDate, @EndDate, @TotalPrice, @SecurityDeposit, 'Booked');
END;


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

--12
CREATE PROCEDURE GetCarPriceTrends 
AS
BEGIN
    SELECT carID, Model, Make, Price, listed_at FROM CARS_ON_SALE ORDER BY listed_at DESC;
END;

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

--14
CREATE PROCEDURE GetUserProfile
    @UserID INT
AS
BEGIN
    SELECT 
        UserName, Name, Phone_Number, Email, Profile_Pic,
        (SELECT carID FROM CARS_ON_RENT WHERE renter_id = @UserID) AS BookedCars
    FROM Users
    WHERE userID = @UserID;
END;

--15
CREATE PROCEDURE ApplyDiscount
    @RenterID INT,
    @Discount DECIMAL(10,2)
AS
BEGIN
    UPDATE RENTER
    SET wallet_balance = wallet_balance + @Discount
    WHERE Renter_ID = @RenterID;
END;

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


--17
CREATE PROCEDURE GetCarAnalysis
    @CarID INT
AS
BEGIN
    SELECT Make, Model, Variant, year, Description, Condition, Category, fuel_type, transmission
    FROM CAR_DETAILS
    WHERE carID = @CarID;
END;


--18
CREATE PROCEDURE UpdateBuyerLevel
    @ClientID INT,
    @TotalSpent DECIMAL(10,2)
AS
BEGIN
    UPDATE CLIENT
    SET total_spent = @TotalSpent
    WHERE Client_ID = @ClientID;
END;


--19
CREATE PROCEDURE FilterCars
    @Brand VARCHAR(100) = NULL,
    @MinPrice DECIMAL(10,2) = NULL,
    @MaxPrice DECIMAL(10,2) = NULL,
    @Transmission VARCHAR(50) = NULL
AS
BEGIN
    SELECT *
    FROM CAR_DETAILS
    WHERE 
        (@Brand IS NULL OR Make = @Brand) AND
        (@MinPrice IS NULL OR Price >= @MinPrice) AND
        (@MaxPrice IS NULL OR Price <= @MaxPrice) AND
        (@Transmission IS NULL OR transmission = @Transmission);
END;

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

--21
CREATE PROCEDURE DeleteCar
    @CarID INT
AS
BEGIN
    DELETE FROM Cars WHERE CarID = @CarID;
END;

--22
CREATE PROCEDURE CancelBooking
    @RentalID INT
AS
BEGIN
    UPDATE CarRentals SET Status = 'Cancelled' WHERE RentalID = @RentalID;
END;

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

--24
CREATE PROCEDURE GetUserMessages
    @UserID INT
AS
BEGIN
    SELECT SenderID, ReceiverID, MessageText, SentAt, Status
    FROM Messages
    WHERE ReceiverID = @UserID OR SenderID = @UserID
    ORDER BY SentAt DESC;
END;

--25
CREATE PROCEDURE ReturnCar @RentalID INT
AS
BEGIN
    DECLARE @CarID INT, @UserID INT, @RentalDate DATETIME, @ReturnDate DATETIME, @DailyRate DECIMAL(10,2), @TotalAmount DECIMAL(10,2);
    
    SELECT @CarID = carID, @UserID = userID, @RentalDate = rentalDate, @DailyRate = dailyRate
    FROM CarRentals CR INNER JOIN Cars C ON CR.carID = C.carID
    WHERE rentalID = @RentalID AND status = 'Active';
    
    IF @CarID IS NULL
    BEGIN
        RAISERROR ('Invalid rental or already completed.', 16, 1);
        RETURN;
    END
    
    SET @ReturnDate = GETDATE();
    SET @TotalAmount = DATEDIFF(DAY, @RentalDate, @ReturnDate) * @DailyRate;
    
    UPDATE CarRentals SET returnDate = @ReturnDate, totalAmount = @TotalAmount, status = 'Completed' WHERE rentalID = @RentalID;
    UPDATE Cars SET availability = 1 WHERE carID = @CarID;
END;


--26
-- Reporting: Get Total Revenue & Active Rentals
CREATE PROCEDURE GetRentalReport
AS
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM CarRentals WHERE status = 'Active') AS activeRentals,
        (SELECT SUM(totalAmount) FROM CarRentals WHERE status = 'Completed') AS totalRevenue;
END;

--27
-- Reporting: Top 5 Cars by Rating
CREATE PROCEDURE GetTopRatedCars
AS
BEGIN
    SELECT C.carID, C.make, C.model, AVG(R.rating) AS avgRating
    FROM Ratings R
    INNER JOIN Cars C ON R.carID = C.carID
    GROUP BY C.carID, C.make, C.model
    ORDER BY avgRating DESC
    OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
END;
