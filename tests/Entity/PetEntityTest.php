<?php

namespace App\Tests\Entity;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\Pets;
use Doctrine\ORM\EntityManagerInterface;

final class PetEntityTest extends WebTestCase
{
    protected EntityManagerInterface $entity_manager;
    protected function setUp(): void {
        self::bootKernel();
        $this->entity_manager = static::getContainer()->get('doctrine')->getManager();
    }

    public function testMain(): void
    {
        $pet = new Pets();
        $pet->setType('Dog');
        $pet->setName('Test Name');
        $pet->setBreed('Pitbull (dangerous)');
        $pet->setSex('Male');
        $pet->setIsDangerous(1);
        $pet->setApproximateAge(5);
        $this->entity_manager->persist($pet);
        $this->entity_manager->flush();
        self::assertNotEmpty($pet->getId());
    }

    public function testBirth(): void
    {
        $pet = new Pets();
        $pet->setType('Dog');
        $pet->setName('Test Name');
        $pet->setBreed('Pitbull');
        $pet->setSex('Male');
        $pet->setIsDangerous(0);
        $pet->setDateOfBirth(new \DateTime('now'));
        $this->entity_manager->persist($pet);
        $this->entity_manager->flush();
        self::assertNotEmpty($pet->getId());
    }
}
