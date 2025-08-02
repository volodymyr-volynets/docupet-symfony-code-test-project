<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PetController extends AbstractController
{
    #[Route('/pet', name: 'app_pet')]
    public function index(): Response
    {
        $dog_breeds = json_decode(file_get_contents(__DIR__ . '/../SeedData/dog_breeds.json'), false);
        $cat_breeds = json_decode(file_get_contents(__DIR__ . '/../SeedData/cat_breeds.json'), false);
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
}
