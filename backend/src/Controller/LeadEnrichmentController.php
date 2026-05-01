<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/lead-enrichment', name: 'api_lead_enrichment_')]
class LeadEnrichmentController extends AbstractController
{
    #[Route('/capture', name: 'capture', methods: ['POST'])]
    public function capture(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json(
                ['ok' => false, 'message' => 'Invalid JSON payload.'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $leadData = [
            'sessionId' => $payload['sessionId'] ?? null,
            'email' => $payload['email'] ?? null,
            'linkedinUrl' => $payload['linkedinUrl'] ?? null,
            'pagesViewed' => $payload['pagesViewed'] ?? [],
            'roi' => $payload['roi'] ?? [],
            'businessInput' => $payload['input'] ?? [],
            'ipEnrichment' => [
                'companyName' => $payload['ipEnrichmentData']['companyName'] ?? null,
                'industry' => $payload['ipEnrichmentData']['industry'] ?? null,
                'headcount' => $payload['ipEnrichmentData']['headcount'] ?? null,
                'source' => $payload['ipEnrichmentData']['source'] ?? 'unknown',
                'enrichedAt' => $payload['ipEnrichmentData']['enrichedAt'] ?? null,
            ],
            'capturedAt' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
        ];

        // Webhook-ready placeholder for HubSpot/Pipedrive dispatch.
        // Example next step:
        // $this->crmWebhookService->pushLead($leadData);

        return $this->json([
            'ok' => true,
            'message' => 'Lead capture received and ready for CRM sync.',
            'leadData' => $leadData,
        ]);
    }

    #[Route('/health', name: 'health', methods: ['GET'])]
    public function health(): JsonResponse
    {
        return $this->json([
            'ok' => true,
            'service' => 'lead-enrichment',
            'timestamp' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
        ]);
    }
}
