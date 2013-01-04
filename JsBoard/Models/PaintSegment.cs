using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace JsBoard.Models
{
    public class PaintSegment
    {
        [Key]
        public long PaintSegmentId { get; set; }

        public string ConnectionId { get; set; }
        public string ElementJson { get; set; }
    }
}