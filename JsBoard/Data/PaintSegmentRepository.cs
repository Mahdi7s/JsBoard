using JsBoard.Data.Contracts;
using JsBoard.Models;

namespace JsBoard.Data
{
    public sealed class PaintSegmentRepository : InMemoryRepository<PaintSegment>, IPaintSegmentRepository
    {
        public PaintSegmentRepository()
            : base("PaintSegmentId", true)
        {
        }
    }
}