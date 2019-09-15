using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwarmPlus.Models
{
    public class Rootobject
    {
        public Connectionstrings ConnectionStrings { get; set; }
        public Foursquare Foursquare { get; set; }
    }

    public class Connectionstrings
    {
        public string DefaultConnection { get; set; }
    }

    public class Foursquare
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string RedirectUri { get; set; }
    }

}
