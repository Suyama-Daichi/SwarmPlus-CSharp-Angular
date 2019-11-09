using SwarmPlus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SwarmPlusContext db)
        {
            db.Database.EnsureCreated();

            // ユーザーマスタにデータが存在するか。存在しなければ下記のデフォルトデータをINSERTする
            if (db.User.Any())
            {
                return;
            }

            // テストユーザーを作成
            var users = new User[]
            {
                //new User{ UserID="TestUser1", AccessToken ="ABCDEFGHIJKLMNOPQRSTUVWXYZ", RegistDateTime = DateTime.Now, DeleteFlag =false}
            };

            // ユーザーマスタにINSERT
            db.User.Add(users[0]);
            db.SaveChanges();
        }
    }
}

