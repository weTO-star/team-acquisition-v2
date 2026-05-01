<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/leads', name: 'api_leads_')]
class LeadController extends AbstractController
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

        $normalized = [
            'sessionId' => $payload['intentData']['sessionId'] ?? null,
            'email' => $payload['email'] ?? null,
            'linkedinUrl' => $payload['linkedinUrl'] ?? null,
            'inputs' => [
                'monthlyLeadGoal' => $payload['inputs']['monthlyLeadGoal'] ?? null,
                'currentCloseRate' => $payload['inputs']['currentCloseRate'] ?? null,
                'averageContractValue' => $payload['inputs']['averageContractValue'] ?? null,
            ],
            'projection' => $payload['projection'] ?? [],
            'intentData' => [
                'durationSeconds' => $payload['intentData']['durationSeconds'] ?? 0,
                'pagesViewed' => $payload['intentData']['pagesViewed'] ?? [],
                'ipEnrichment' => [
                    'companyName' => $payload['intentData']['ipEnrichment']['companyName'] ?? null,
                    'industry' => $payload['intentData']['ipEnrichment']['industry'] ?? null,
                    'headcount' => $payload['intentData']['ipEnrichment']['headcount'] ?? null,
                    'source' => $payload['intentData']['ipEnrichment']['source'] ?? 'unknown',
                ],
            ],
            'capturedAt' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
        ];

        $isHighValue = $this->isHighValueVisitor($normalized);

        // API Platform entity persistence + CRM webhook can be connected here.
        // Example:
        // $this->leadService->store($normalized);
        // if ($isHighValue) { $this->crmWebhookService->notifyPriorityLead($normalized); }

        return $this->json([
            'ok' => true,
            'highValue' => $isHighValue,
            'message' => $isHighValue
                ? 'High-value lead captured and ready for priority CRM routing.'
                : 'Lead captured and ready for standard CRM routing.',
            'lead' => $normalized,
        ]);
    }

    #[Route('/intent-webhook', name: 'intent_webhook', methods: ['POST'])]
    public function intentWebhook(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        if (!is_array($payload)) {
            return $this->json(
                ['ok' => false, 'message' => 'Invalid JSON payload.'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $profile = [
            'companyName' => $payload['companyName'] ?? null,
            'industry' => $payload['industry'] ?? null,
            'headcount' => $payload['headcount'] ?? null,
            'pagesViewed' => $payload['pagesViewed'] ?? [],
            'sessionDuration' => $payload['sessionDuration'] ?? 0,
            'source' => $payload['source'] ?? 'unknown',
        ];

        // Webhook placeholder for HubSpot/Pipedrive.
        // Example: $this->crmWebhookService->pushIntentSignal($profile);

        return $this->json([
            'ok' => true,
            'message' => 'Intent webhook received.',
            'profile' => $profile,
        ]);
    }

    #[Route('/health', name: 'health', methods: ['GET'])]
    public function health(): JsonResponse
    {
        return $this->json([
            'ok' => true,
            'service' => 'lead-controller',
            'timestamp' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
        ]);
    }

    private function isHighValueVisitor(array $lead): bool
    {
        $projectedAnnualGrowth = (int)($lead['projection']['annualGrowth'] ?? 0);
        $headcount = (int)($lead['intentData']['ipEnrichment']['headcount'] ?? 0);
        $sessionDuration = (int)($lead['intentData']['durationSeconds'] ?? 0);

        return $projectedAnnualGrowth >= 120000
            || $headcount >= 50
            || $sessionDuration >= 120;
    }
}
