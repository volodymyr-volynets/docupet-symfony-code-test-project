<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Pets;
use Doctrine\ORM\EntityManagerInterface;

final class PetController extends AbstractController
{
    #[Route('/pet', name: 'app_pet')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        if ($request->request->get('submit_button')) {
            $pet = new Pets();
            $pet->setType($request->request->get('type'));
            $pet->setName($request->request->get('name'));
            $pet->setBreed($request->request->get('breed'));
            $pet->setSex($request->request->get('gender'));
            $pet->setIsDangerous(strpos($request->request->get('breed'), '(dangerous)') !== false ? 1 : 0);
            $pet->setApproximateAge($request->request->get('approx_age') ?? null);
            // birth_month, birth_day, birth_year
            if ($request->request->get('birth_month')) {
                $timestamp = mktime(0, 0, 0, $request->request->get('birth_month'), $request->request->get('birth_day'), $request->request->get('birth_year'));
                $dt = new \DateTime();
                $pet->setDateOfBirth($dt->setTimestamp($timestamp));
            }
            $entityManager->persist($pet);
            $entityManager->flush();
            return $this->redirectToRoute('app_pet_view', ['id' => $pet->getId()]);
        }
        // load preset files
        $dog_breeds = json_decode(file_get_contents(__DIR__ . '/../SeedData/dog_breeds.json'), false);
        $cat_breeds = json_decode(file_get_contents(__DIR__ . '/../SeedData/cat_breeds.json'), false);
        // render view
        return $this->render('pet/index.html.twig', [
            'controller_name' => 'PetController',
            'breed_presets' => [
                'Dog' => $dog_breeds,
                'Cat' => $cat_breeds,
            ],
            'name' => 'Mikki',
            'errors' => '',
        ]);
    }

    #[Route('/pet_view', name: 'app_pet_view')]
    public function view(Request $request, EntityManagerInterface $entityManager): Response
    {
        $id = $request->query->get('id');
        $pet = $entityManager->find(Pets::class, $id);
        if (!$pet) {
            throw new \UnexpectedValueException('Record not found!');
        }
        // render view
        return $this->render('pet/view.html.twig', [
            'controller_name' => 'PetController',
            'id' => $id,
            'pet' => [
                'id' => $pet->getId(),
                'name' => $pet->getName(),
                'type' => $pet->getType(),
                'breed' => $pet->getBreed(),
                'date_of_birth' => $pet->getDateOfBirth() ? $pet->getDateOfBirth()->format('Y-m-d') : '',
                'sex' => $pet->getSex(),
                'is_dangerous' => $pet->isDangerous() ? 'Yes' : 'No',
                'age' => $pet->getApproximateAge(),
            ],
        ]);
    }
}
