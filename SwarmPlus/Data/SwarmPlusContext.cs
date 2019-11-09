using Microsoft.EntityFrameworkCore;
using SwarmPlus.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Data
{
    /// <summary>
    /// DBContext
    /// 参照ページ：https://docs.microsoft.com/ja-jp/aspnet/core/data/ef-mvc/intro?view=aspnetcore-2.2
    /// </summary>
    public class SwarmPlusContext: DbContext
    {
        public SwarmPlusContext(DbContextOptions<SwarmPlusContext> options) : base(options) { }

        /// <summary>
        /// ユーザーマスタ
        /// </summary>
        public DbSet<User> User { get; set; }

        /// <summary>
        /// テーブル名を明示的に変更する
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }
}
