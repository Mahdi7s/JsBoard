using System.Collections.Generic;
using JsBoard.Models;

namespace JsBoard.Data.Contracts
{
    public interface IPaintSegmentRepository
    {
        void Add(PaintSegment entity);
        void Remove(PaintSegment entity);
        void RemoveById(object id);
        void Update(PaintSegment entity);
        IEnumerable<PaintSegment> GetAll();
    }
}