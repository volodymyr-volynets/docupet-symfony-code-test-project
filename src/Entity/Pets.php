<?php

namespace App\Entity;

use App\Repository\PetsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PetsRepository::class)]
class Pets
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 15)]
    #[Assert\NotBlank]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $breed = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTime $date_of_birth = null;

    #[ORM\Column(length: 15)]
    private ?string $sex = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    private ?bool $is_dangerous = null;

    #[ORM\Column(nullable: true)]
    private ?int $approximate_age = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getBreed(): ?string
    {
        return $this->breed;
    }

    public function setBreed(string $breed): static
    {
        $this->breed = $breed;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTime
    {
        return $this->date_of_birth;
    }

    public function setDateOfBirth(?\DateTime $date_of_birth): static
    {
        $this->date_of_birth = $date_of_birth;

        return $this;
    }

    public function getSex(): ?string
    {
        return $this->sex;
    }

    public function setSex(string $sex): static
    {
        $this->sex = $sex;

        return $this;
    }

    public function isDangerous(): ?bool
    {
        return $this->is_dangerous;
    }

    public function setIsDangerous(bool $is_dangerous): static
    {
        $this->is_dangerous = $is_dangerous;

        return $this;
    }

    public function getApproximateAge(): ?int
    {
        return $this->approximate_age;
    }

    public function setApproximateAge(?int $approximate_age): static
    {
        $this->approximate_age = $approximate_age;

        return $this;
    }
}
