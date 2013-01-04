using System.Linq;
using System.Threading.Tasks;
using JsBoard.Data.Contracts;
using JsBoard.Models;
using Microsoft.AspNet.SignalR.Hubs;

namespace JsBoard.Hubs
{
    public class PaintingHub : Hub
    {
        private readonly IPaintSegmentRepository _paintSegmentRepository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="paintSegmentRepository">this will be injected by ninject!</param>
        public PaintingHub(IPaintSegmentRepository paintSegmentRepository)
        {
            _paintSegmentRepository = paintSegmentRepository;
        }

        public string[] GetPaperElements()
        {
            return _paintSegmentRepository.GetAll().Select(x => x.ElementJson).ToArray();
        }

        public void BroadcastPaintElem(string elementJson)
        {
            _paintSegmentRepository.Add(new PaintSegment {ElementJson = elementJson, ConnectionId = Context.ConnectionId});
            Clients.Others.newPaintElementAdded(elementJson);
        }
    }
}