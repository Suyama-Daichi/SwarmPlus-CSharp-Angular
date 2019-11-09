CREATE TABLE [dbo].[Users] (
    [UserID]           NVARCHAR (450) NOT NULL,
    [AccessToken]      NVARCHAR (MAX) NULL,
    [RegistDateTime]   DATETIME2 (7)  NOT NULL,
    [lastReadDateTime] DATETIME2 (7)  NOT NULL,
    [DeleteFlag]       BIT            NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([UserID] ASC)
);

