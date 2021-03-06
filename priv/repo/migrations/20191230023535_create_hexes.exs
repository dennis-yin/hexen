defmodule Hexen.Repo.Migrations.CreateHexes do
  use Ecto.Migration

  def change do
    create table(:hexes) do
      add(:name, :string)
      add(:structure, :string)
      add(:resource, :string)
      add(:region_id, references(:regions, on_delete: :nothing))
      add(:biome_id, references(:biomes, on_delete: :nothing))
      add(:band_id, references(:bands, on_delete: :nothing))

      timestamps()
    end

    create(index(:hexes, [:name]))
    create(index(:hexes, [:region_id]))
    create(index(:hexes, [:biome_id]))
    create(index(:hexes, [:band_id]))
  end
end
