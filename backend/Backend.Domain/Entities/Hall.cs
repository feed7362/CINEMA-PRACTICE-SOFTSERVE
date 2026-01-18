using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public enum HallFormat : short
{
    REGULAR = 0,
    IMAX = 1,
    _3D = 2
}

public class Hall : IEntity
{
    public int Id { get; set; }

    public HallFormat Format { get; set; } = HallFormat.REGULAR;

    public string Name { get; set; } = null!;

    public int Capacity { get; set; }

    public ICollection<Seat> Seats { get; set; } = new List<Seat>();
    public ICollection<Session> Sessions { get; set; } = new List<Session>();

}